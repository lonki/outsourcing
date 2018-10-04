<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <meta name="keywords" content="virtual dressing room, virtual fitting room, try clothes online">
      <title>Your Virtual Dressing Room: Try Clothes Online</title>
      <meta name="description" content="Create your 3D Model and try clothes online at Style.me. Our Virtual Fitting Room is the ultimate online tool to shop clothing online with confidence!">
      <meta name="author" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=3">
      <meta name="google-site-verification" content="lRtEbvPvFNn_k3jDTGt3gZQR1GiBY_RLr94VGRo9EoE" />

      <meta property="og:url" content="<%= htmlWebpackPlugin.options.domain %>" />
      <meta property="og:title" content="Your Virtual Dressing Room: Try Clothes Online" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="<%= htmlWebpackPlugin.options.domain %>/share.jpg?t=<%= htmlWebpackPlugin.options.timestamp %>" />
      <meta property="og:site_name" content="Style.me" />
      <meta property="og:description" content="Create your 3D Model and try clothes online at Style.me. Our Virtual Fitting Room is the ultimate online tool to shop clothing online with confidence!" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@StyleMe3D" />

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
        }

        .loader-circle {
          width:50px;
          height:50px;
          background:#3ac;
          border-radius:100%;
          display: inline-block;
          animation: slide 1.5s infinite;
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
          <p class="loader-text">
            DINNGO
          </p>
        </div>
      </div>

      <div id="root">
      </div>
  </body>
</html>
