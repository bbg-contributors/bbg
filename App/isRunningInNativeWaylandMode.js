module.exports = function () {
  if (process.argv.includes("--ozone-platform=wayland")) {
    console.log("Running in native wayland mode.");
    return true;
  } else {
    return false;
  }
};