const isValidMultimedia = (value) => {
  for (const item of value) {
    if (item.label === null || item.type === null || item.url === null) {
      throw new Error("Invalid multimedia item");
    }
  }
};

const isValidAudio = (value) => {
  for (const item of value) {
    if (item.label === null || item.type === null || item.url === null) {
      throw new Error("Invalid audio item");
    }
  }
};

const isValidVideo = (value) => {
  if (value.platform !== null && value.url === null) {
    throw new Error("Video URL is required");
  }
};

const isLabelsEmpty = (value) => {
  if (value.length === 0) {
    throw new Error("Labels cannot be empty");
  }
};

const isValidImage = (value) => {
  for (const item of value) {
    if (item.caption === null || item.url === null) {
      throw new Error("Invalid image item");
    }
  }
};
const CisValidImage = (value) => {
  for (const item of value) {
    if (item.caption === null || item.url === null) {
      throw new Error("Invalid image item");
    }
  }
};

module.exports = {
  isValidMultimedia,
  isLabelsEmpty,
  isValidAudio,
  isValidImage,
  isValidVideo,
  CisValidImage,
};
