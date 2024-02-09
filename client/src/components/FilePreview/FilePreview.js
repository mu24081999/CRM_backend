import React from "react";

function FilePreview({ fileType, fileUrl }) {
  let content;

  switch (fileType) {
    case "jpeg":
      content = (
        <img
          className="img-fluid rounded"
          style={{ maxWidth: "300px" }}
          src={fileUrl}
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
          alt=" preview"
        />
      );
      break;

    case "pdf":
      content = (
        <iframe src={fileUrl} title="PDF preview" width="100%" height="500px" />
      );
      break;
    case "video":
      content = (
        <video controls width="100%" height="auto">
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
