import React from "react";
import { FaFileArchive, FaFilePdf } from "react-icons/fa";

function FilePreview({ fileType, fileUrl, fileWidth }) {
  let content;

  switch (fileType) {
    case "jpeg":
      content = (
        <img
          className="img-fluid rounded"
          style={{ maxWidth: "300px" }}
          src={fileUrl}
          width={fileWidth}
          alt=" preview"
        />
      );
      break;
    case "png":
      content = (
        <img
          className="img-fluid rounded"
          style={{ maxWidth: "300px" }}
          src={fileUrl}
          width={fileWidth}
          alt=" preview"
        />
      );
      break;
    case "jpg":
      content = (
        <img
          className="img-fluid rounded"
          style={{ maxWidth: "300px" }}
          src={fileUrl}
          width={fileWidth}
          alt=" preview"
        />
      );
      break;

    case "pdf":
      content = (
        // <iframe
        //   src={fileUrl}
        //   width={fileWidth}
        //   title="PDF preview"
        //   // width="100%"
        //   height="45px"
        // />
        <FaFilePdf />
      );
      break;
    case "zip":
      content = <FaFileArchive />;
      break;
    case "video":
      content = (
        <video controls width={fileWidth} height="auto">
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
      break;
    default:
      content = <p>Unsupported file type</p>;
  }

  return <div>{content}</div>;
}

export default FilePreview;
