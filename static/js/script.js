const form = document.querySelector("form"),
  fileInput = form.querySelector(".file-input"),
  progressArea = document.querySelector(".progress-area"),
  uploaded = document.querySelector(".uploaded");

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = (e) => {
  console.log(e.target.files);
  const file_Name = e.target.files[0].name;
  const splitName = file_Name.split(".");
  // const final_name =
    splitName[0].length > 20
      ? splitName[0].substr(0, 25).concat("..." + splitName[1])
      : splitName[0];



  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/upload", true);

  xhr.upload.onprogress = ({ loaded, total }) => {

    loadedKB = Math.floor(loaded / 1000) ;
    totalKB = Math.floor(total / 1000);

    percentage = Math.floor((loadedKB / totalKB) * 100);

    size =
      totalKB < 1024 ? `${loadedKB} KB` : `${(loadedKB / 1024).toFixed(2)} MB`;
    console.log(size);


    // progressArea.innerHTML = `
    //  let progressHTML = `
    //                           <i class="fas fa-file-alt"></i>
    //                           <div class="content">
    //                             <div class="detail">
    //                               <span class="name">${file_Name} | Uploading</span>
    //                               <span class="percent">${percentage}%</span>
    //                             </div>
    //                             <div class="progress-bar">
    //                               <div class="progress" style="width:${percentage}%"></div>
    //                             </div>
    //                           </div>`;
    //   progressArea.innerHTML = progressHTML;
      if (loadedKB == totalKB) {
      // progressArea.innerHTML = "";
      let uploadedContent = `
                              <div class="uploaded-area">
                              <i class="fas fa-file-alt"></i>
                              <div class="content">
                                <div class="detail">
                                  <span class="name">${file_Name} | Uploaded</span>
                                  </div>
                                  <span class="size">${size}</span>
                              </div>
                            </div>`;
      uploaded.insertAdjacentHTML("afterbegin", uploadedContent);
                              }
  };

  // xhr.onload = (e) => {
  //   const { err } = JSON.parse(xhr.response);

    // if (err) {
    //   progressArea.innerHTML = "";
    //   const { name, message, code } = err;
    //   message2 = "";
    //   if (code == "LIMIT_FILE_SIZE") {
    //     message2 = "image size must be lesser than 2mb,";
    //   }

    //   // alert(name +": " +message)
    //   error.style.display = "block";
    //   error.style.opacity = "100";
    //   error.innerText = message2 + message;
    //   setTimeout((e) => {
    //     error.style.opacity = "0";
    //     error.style.display = "none";
    //   }, 3000);
    //   return;
    // }

    
  // };
  xhr.send(new FormData(form));
  console.log("request send");
};







