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
            /* .memo-page{
                  background: white;
                  width: 21cm;
                  height: 20.0cm;
                  display: block;
                  margin: 0 auto;
                  padding: 20px;
                  margin-bottom: 0.5cm;
                  box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
            } */
            .memo-page{
                  width: 21cm;
                  height: 29.7cm;
                  margin:0 auto;
                  display: block;
                  padding: 20px;
                  margin-bottom: 0.5cm;
            }
            .memo-details{
                  margin: 15px;
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
                  font-weight: bold;
                  text-transform: upperCase;
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
                  letter-spacing: 1px;
                  font-size: 14px;
            }
            /* @media print {
                  @page {
                        size: 210mm 297mm;
                        margin: 0;
                        margin-right: 0;
                  }
            } */
            @page{
                  size: A4;
                  background: white;
                  width: 21cm;
                  height: 29.7cm;
                  display: block;
                  margin: 0 auto;
                  margin-bottom: 0.5cm;
            }
            @media print {
                  html, body{
                        width: 210mm;
                        height: 297mm;
                  }
            }
      </style>
</head>
<body>

      <div class="memo-page">
            <div class="memo-details">
                  <div class="content">
                        <div class="memoId">MEMO ID: ${id}</div>
                        <div class="status">status:APPROVED</div>
                  </div>
                  <div class="header">
                        <p class="head">TO: EXECUTIVE DIRECTOR</p>
                        <p class="head">FROM:${from}</p>
                        <p class="head">Cc: ${copy || "Not specified"}</p>
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
     
</body>
</html>
`;
};
