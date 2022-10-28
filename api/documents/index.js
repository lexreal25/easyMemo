module.exports = ({
  id,
  to,
  through,
  from,
  date,
  copy,
  files,
  signature,
  content,
  sender,
  subject,
}) => {
  return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
           
      </style>
</head>
<body>

      <div class="memo-page">
            <div class="memo-details">
                  <div class="content">
                  .memo-page{
                        width: 21cm;
                        height: 29.7cm;
                        margin: auto;
                        background-color: rgba(240, 233, 233, 0.75);
                        padding: 20px;
                        margin-bottom: 0.5cm;
                  }
                  .memo-details{
                        padding-top: 20px;
                        padding-left: 15px;
                        padding-right: 15px;
                  }
                  .memoId{
                        color: #A52294;
                  }
                  .content{
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                  }
                  .status{
                      font-size: 12px;
                      color: green;
                      font-family: 'Times New Roman', Times, serif
                  }
                  .subject{
                        text-decoration: underline;
                        margin: 20px 0 20px 0;
                        font-weight: bold;
                  }
                  .docs{
                        display:flex;
                        flex-direction: column;
                        margin: 5px;
                  }
                  .docs span{
                        padding: 5px;
                  }
                  .head{
                        font-family: 'Times New Roman', Times, serif;
                        letter-spacing: 1.2px;
                        font-size: 14px;
                  }
                 .header{
                  margin-top: 25px;
                 }
                 .signature{
                  margin-top: 25px;
                 }
                  @page{
                        size: A4;
                        margin: 0;
                  }
                  @media print {
                        html, body{
                              width: 210mm;
                              height: 297mm;
                        }
                  }        <div class="memoId">MEMO ID: ${id}</div>
                        // <div class="status">status:</div>
                  </div>
                  <div class="header">
                        <p class="head">TO: ${to}</p>
                        <p class="head">FROM:${from}</p>
                        <p class="head">Cc: ${copy}</p>
                        <p class="head">DATE: ${date.split("T")[0]}</p>
                        <p class="head subject">SUBJECT: ${subject}</p>
                  </div>
                  <div class="body">
                        <p class="message">${content}</p>
                        <span>Attached Documents:</span>                    
                        <div class="docs" id="doc">       
                            <p id='docs'></p>
                        </div>
                       
                  </div>
                  <div class="salutation">
                        <img src=${signature} alt="signature" width="50" height="50" />
                        <p>(${sender})</p>
                  </div>
            </div>
      </div>
      {/* //      <script>
      //             const doc = document.getElementById('docs')
      //                   doc.innerHTML = ${files.map((file) => file)}
      //      </script> */}
</body>
</html>
`};
