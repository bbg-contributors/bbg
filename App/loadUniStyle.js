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

        .page-item,.article-item{
          background-color: white;
          margin-top: 30px;
          margin-bottom: 30px;
          padding-top:24px;
          padding-bottom:24px;
          padding-left:36px;
          padding-right:36px;
          box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
          opacity: 0.8;
          border-radius: 12px;
      }

      .nav-item .nav-link{
          color:grey!important;
      }

      body:before {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: .4;
        z-index: -1;
        content: "";
        position: fixed;
        background-color: rgb(240, 244, 249);
      }

      .fluentbtn{
        border-radius: 6px;
        background-color: rgb(254, 254, 254);
        border-style: solid;
        border-width: 2px;
        border-color: rgb(235, 237, 238);
        padding-top: 8px;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 8px;
        text-decoration: none;
        color: black;
        font-size: 92%;
      }

      .fluentbtn-blue{
        background-color: rgb(101, 145, 255)!important;
        color:white!important
      }
  
      .fluentbtn-blue:hover{
        background-color: rgb(116, 156, 255)!important;
        color:white!important
      }
  
      .fluentbtn-blue:active{
        background-color: rgb(130, 166, 255)!important;
        color:rbg(218,228,255)!important
      }
  
      .fluentbtn:hover{
        background-color: rgb(250,251,251);
        text-decoration: none;
        color: black;
  
      }
  
      .fluentbtn:active{
        background-color: rgb(250,251,251);
        text-decoration: none;
        color: grey;
  
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

/* - �������� */
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

/* - ƽ�� */
@keyframes up-and-down{ from{ transform: translateY(-20px) } to{ transform: translateY(20px) } }
@-webkit-keyframes up-and-down{ from{ transform: translateY(-20px) } to{ transform: translateY(20px) } }

@keyframes left-and-right{ from{ transform: translateX(-20px) } to{ transform: translateX(20px) } }
@-webkit-keyframes left-and-right{ from{ transform: translateX(-20px) } to{ transform: translateX(20px) } }

/* - ��ת */
@keyframes rotate{ from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }
@-webkit-keyframes rotate{ from{ transform: rotate(0deg) } to{ transform: rotate(360deg) } }

/* - ���� */
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