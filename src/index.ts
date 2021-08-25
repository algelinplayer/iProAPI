import express from "express";
import { Application, Request, Response } from "express";
import resizer from "./utilities/resizer";
import reader from "./utilities/reader";

const app: Application = express();
const port = 3000;

app.get(
  "/ipro/images",
  resizer.resizer,
  reader.imagePathBuilder,
  (req: Request, res: Response) => {
    if (res.locals.cachedImageFullFilePath) {
      res.sendFile(res.locals.cachedImageFullFilePath);
    } else {
      res.status(500).send("Could not resize the image.");
    }
  }
);

app.listen(port, () => {
  console.log(`Http server set at port ${port}`);
});

export default app;
