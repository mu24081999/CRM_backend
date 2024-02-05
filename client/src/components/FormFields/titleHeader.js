import React from "react";
import MultipleFields from "./multipleFields";
import PropTypes from "prop-types";
const TitleCard = (props) => {
  const {
    heading,
    headingWithBr,
    paragraph,
    paragraphWithBr,
    headingAfterParagraph,
    beforeBr,
    afterBr,
  } = props;
  return (
    <div className="bg-hero flex flex-col gap-y-3 md:px-14 lg:px-28 xl:px-48 2xl:px-72 py-12">
      {heading && (
        <p className="text-white text-[38px] xl:text-[50px] font-extrabold">
          {heading}
        </p>
      )}
      {headingWithBr && (
        <p className="text-white text-[38px] xl:text-[50px] font-extrabold">
          {beforeBr} <br /> {afterBr}
        </p>
      )}
      {paragraph && (
        <p className="text-white text-[20px] xl:text-[22px] tracking-[-0.9px]">
          {paragraph}
        </p>
      )}
      {paragraphWithBr && (
        <p className="text-white text-[20px] xl:text-[22px] tracking-[-0.9px]">
          {beforeBr} <br /> {afterBr}
        </p>
      )}
      {headingAfterParagraph && (
        <p className="text-white text-[38px] xl:text-[50px] font-extrabold">
          {headingAfterParagraph}
        </p>
      )}
      {/* {field && control && (
        <div className="flex w-full justify-start">
          {" "}
          <MultipleFields control={control} start={start ? start : false} />
        </div>
      )} */}
    </div>
  );
};
TitleCard.prototype = {
  heading: PropTypes.string,
  headingWithBr: PropTypes.string,
  beforeBr: PropTypes.string,
  afterBr: PropTypes.string,
  paragraph: PropTypes.string,
  headingAfterParagraph: PropTypes.string,
};

export default TitleCard;
