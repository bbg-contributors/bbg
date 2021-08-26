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


@keyframes fade-in{ from{ opacity: 0 } to{ opacity: 1 } }
@-webkit-keyframes fade-in{ from{ opacity: 0 } to{ opacity: 1 } }

@keyframes fade-off{ from{ opacity: 1 } to{ opacity: 0 } }
@-webkit-keyframes fade-off{ from{ opacity: 1 } to{ opacity: 0 } }

@keyframes fade-in-top{ from{ opacity: 0; transform: translateY(20px) } to{ opacity: 1; transform: translateY(0) } }
@-webkit-keyframes fade-in-top{ from{ opacity: 0; transform: translateY(20px) } to{ opacity: 1; transform: translateY(0) } }

@keyframes fade-in-bottom{ from{ opacity: 0; transform: translateY(-20px) } to{ opacity: 1; transform: translateY(0) } }
@-webkit-keyframes fade-in-bottom{ from{ opacity: 0; transform: translateY(-20px) } to{ opacity: 1; transform: translateY(0) } }

@keyframes fade-in-left{ from{ opacity: 0; transform: translateX(20px) } to{ opacity: 1; transform: translateX(0) } }
@-webkit-keyframes fade-in-left{ from{ opacity: 0; transform: translateX(20px) } to{ opacity: 1; transform: translateX(0) } }

@keyframes fade-in-right{ from{ opacity: 0; transform: translateX(-20px) } to{ opacity: 1; transform: translateX(0) } }
@-webkit-keyframes fade-in-right{ from{ opacity: 0; transform: translateX(-20px) } to{ opacity: 1; transform: translateX(0) } }

/* - 淡入缩放 */
@keyframes fade-small-large{ from{ opacity: 0; transform: scale(.5, .5) } to{ opacity: 1; transform: scale(1, 1) } }
@-webkit-keyframes fade-small-large{ from{ opacity: 0; transform: scale(.5, .5) } to{ opacity: 1; transform: scale(1, 1) } }

@keyframes fade-large-small{ from{ opacity: 1; transform: scale(1, 1) } to{ opacity: 0; transform: scale(.5, .5) } }
@-webkit-keyframes fade-large-small{ from{ opacity: 1; transform: scale(1, 1) } to{ opacity: 0; transform: scale(.5, .5) } }

@keyframes fade-larger-small{ from{ opacity: 0; transform: scale(1.5, 1.5) } to{ opacity: 1; transform: scale(1, 1) } }
@-webkit-keyframes fade-larger-small{ from{ opacity: 0; transform: scale(1.5, 1.5) } to{ opacity: 1; transform: scale(1, 1) } }

@keyframes fade-small-larger{ from{ opacity: 1; transform: scale(1, 1) } to{ opacity: 0; transform: scale(1.5, 1.5) } }
@-webkit-keyframes fade-small-larger{ from{ opacity: 1; transform: scale(1, 1) } to{ opacity: 0; transform: scale(1.5, 1.5) } }

@keyframes scale-small-large{ from{ transform: scale(0, 0) } to{ transform: scale(1, 1) } }
@-webkit-keyframes scale-small-large{ from{ transform: scale(0, 0) } to{ transform: scale(1, 1) } }

@keyframes scale-large-small{ from{ transform: scale(1, 1) } to{ transform: scale(0, 0) } }
@-webkit-keyframes scale-large-small{ from{ transform: scale(1, 1) } to{ transform: scale(0, 0) } }

/* - 平移 */
@keyframes up-and-down{ from{ transform: translateY(-20px) } to{ transform: translateY(20px) } }
@-webkit-keyframes up-and-down{ from{ transform: translateY(-20px) } to{ transform: translateY(20px) } }

@keyframes left-and-right{ from{ transform: translateX(-20px) } to{ transform: translateX(20px) } }
@-webkit-keyframes left-and-right{ from{ transform: translateX(-20px) } to{ transform: translateX(20px) } }

/* - 旋转 */
@keyframes rotate{ from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
@-webkit-keyframes rotate{ from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }

/* - 弹跳 */
@keyframes jump{
    0% {
        transform: translateY(0) scale(1.15,.8)
    }

    20% {
        transform: translateY(-35px) scaleY(1.1)
    }

    50% {
        transform: translateY(-50px) scale(1)
    }

    80% {
        transform: translateY(-35px) scale(1)
    }

    to {
        transform: translateY(0) scale(1.15,.8)
    }
}


`
}