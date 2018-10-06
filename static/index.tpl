<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="keywords" content="">
      <title></title>
      <meta name="description" content="">
      <meta name="author" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3">

      <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" sizes="16x16">

      <link href="https://fonts.googleapis.com/css?family=Yantramanav" rel="stylesheet">

      <style type="text/css">
        @keyframes slide {
          0% {
            transform: scale(1);
          }
          50% {
            opacity: .3;
            transform: scale(2);
          }
          100% {
            transform: scale(1);
          }
        }

        .loader {
          position:fixed;
          top:0;
          right:0;
          bottom:0;
          left:0;
          z-index:99999;
          width:100vw;
          height:100vh;
          background-color:#fff;
        }

        .loader-container{
          display:-webkit-box;
          display:-ms-flexbox;
          display:flex;
          -ms-flex-wrap:wrap;
          flex-wrap:wrap;
          -webkit-box-align:center;
          -ms-flex-align:center;
          align-items:center;
          -webkit-box-pack:center;
          -ms-flex-pack:center;
          justify-content:center;
          height: 100%;
          background-color: #133364;
        }

        .loader-circle {
          width:44.5px;
          height:44.5px;
          border-radius:100%;
          display: inline-block;
          animation: slide 1.5s infinite;
        }

        .loader-circle-left {
          margin-left: 10px;
          z-index: 2;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjYuNzggMTY2Ljc4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzM1ODhkZjt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPuizh+eUoiAyPC90aXRsZT48ZyBpZD0i5ZyW5bGkXzIiIGRhdGEtbmFtZT0i5ZyW5bGkIDIiPjxnIGlkPSLlnJblsaRfMS0yIiBkYXRhLW5hbWU9IuWcluWxpCAxIj48Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjgzLjM5IiBjeT0iODMuMzkiIHI9IjgzLjM5Ii8+PC9nPjwvZz48L3N2Zz4=);
        }

        .loader-circle-right {
          margin-left: -10px;
          z-index: 1;
          background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjYuNzggMTY2Ljc4Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6IzFkYzBmZTt9PC9zdHlsZT48L2RlZnM+PHRpdGxlPuizh+eUoiAzPC90aXRsZT48ZyBpZD0i5ZyW5bGkXzIiIGRhdGEtbmFtZT0i5ZyW5bGkIDIiPjxnIGlkPSLlnJblsaRfMS0yIiBkYXRhLW5hbWU9IuWcluWxpCAxIj48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04MS43OCwxNDkuNzh2LTE3aDE3di0xN2gtMTd2LTE3aDE3djE3aDE3di0xN2gxN3YtMTdoMTd2LTE3aDE0Ljg5YTgzLjM5LDgzLjM5LDAsMSwwLTk5Ljg5LDk5Ljg4VjE0OS43OFptMTctODVoMTd2MTdoLTE3WiIvPjxyZWN0IGNsYXNzPSJjbHMtMSIgeD0iMTE1Ljc4IiB5PSIxMTUuNzgiIHdpZHRoPSIxNyIgaGVpZ2h0PSIxNyIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTgxLjc4LDE0OS43OHYxN2MuNTMsMCwxLjA3LDAsMS42MSwwYTgzLDgzLDAsMCwwLDE1LjM5LTEuNDVWMTQ5Ljc4WiIvPjxyZWN0IGNsYXNzPSJjbHMtMSIgeD0iOTguNzgiIHk9IjEzMi43OCIgd2lkdGg9IjE3IiBoZWlnaHQ9IjE3Ii8+PHJlY3QgY2xhc3M9ImNscy0xIiB4PSIxMzIuNzgiIHk9Ijk4Ljc4IiB3aWR0aD0iMTciIGhlaWdodD0iMTciLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNDkuNzgsMTMyLjc4aC0xN3YxN2gtMTd2MTAuNDdhODMuNzEsODMuNzEsMCwwLDAsNDQuNDctNDQuNDdIMTQ5Ljc4WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE0OS43OCw5OC43OGgxNS41NWE4Myw4MywwLDAsMCwxLjQ1LTE1LjM5YzAtLjU0LDAtMS4wOCwwLTEuNjFoLTE3WiIvPjwvZz48L2c+PC9zdmc+);
        }

        .loader-circle-delay {
          animation-delay: .1s;
        }

        .loader-text {
          position: absolute;
          top: calc(50% - 40px);
          font-size: 30px;
          line-height: 30px;
          font-weight: bold;
          line-height: 1.09;
          letter-spacing: 0.6px;
          color: #000
        }

        .loader.hide{
            display: none;
        }
      </style>
  </head>
  <body>
      <div id="pagePreloader" class="loader">
        <div class="loader-container">
          <div class="loader-circle loader-circle-left">
          </div>
          <div class="loader-circle loader-circle-right loader-circle-delay">
          </div>
        </div>
      </div>

      <div id="root">
      </div>
  </body>
</html>
