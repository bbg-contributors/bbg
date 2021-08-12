module.exports = function () {
    document.getElementById("uniform").innerHTML = `
.article-item,
        .article-content {
            background-color: white;
            margin-top: 30px;
            margin-bottom: 30px;
            padding: 16px;
            box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
            opacity: 0.8;
        }

        .article-item-sub,
        .article-content-sub,
        .page-item-sub {
            color: lightslategray;
        }

        .page-item{
          background-color: white;
          margin-top: 30px;
          margin-bottom: 30px;
          padding: 16px;
          box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
          opacity: 0.8;
      }

      .navbar{
        box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

      }

`
}