import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors({
  origin: "*",
  allowedHeaders: "*"
}))
app.get(
  "*",
  (req, res) => {
    try {
      console.log("request");
      const filePath = "./f.mp4";
      const data = fs.createReadStream(filePath);
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      console.log(req);
      const videoRange = req.headers.range;

      if (videoRange) {
        console.log(videoRange);
        const parts = videoRange.replace(/bytes=/, "").split("-");

        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;
        const head = {
          "Content-Range": `bytes ${start}-${end}/${fileSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunksize,
          "Content-Type": "video/mp4",
        };

        // console.log(head);
        res.writeHead(206, head);
        data.pipe(res);
        data.on("end", () => {
          console.log("request end");
        });
      } else {
        console.log("videoRange not existe");
        const head = {
          // "Content-Range": `bytes 0-${fileSize - 1}/${fileSize}`,
          // "Accept-Ranges": "bytes",
          "Content-Length": fileSize,
          "Content-Type": "video/mp4",
        };
        res.writeHead(206, head);
        data.pipe(res);
        data.on("end", () => {
          console.log("request end");
        });
      }
    } catch (err: any) {
      console.log("error", err.toString());
      res.sendStatus(500);
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
