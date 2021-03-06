const blurs = document.getElementsByName('blur'),
    invert = document.getElementsByName('invert'),
    sepia = document.getElementsByName('sepia'),
    saturate = document.getElementsByName('saturate'),
    hue = document.getElementsByName('hue'),
    btnReset = document.querySelector('.btn-reset'),
    canvas = document.querySelector('canvas'),
    nextImg = document.querySelector('.btn-next'),
    upload  = document.querySelector('input[type="file"]'),
    download = document.querySelector('.btn-save'),
    output = document.querySelectorAll('output'),
    root = document.querySelector(':root'),
    rootStyles = getComputedStyle(root);
    
let images = document.querySelector('img');


window.oninput = function() {
    output[0].innerHTML = `${blurs[0].value}`;
    root.style.setProperty('--blur', `${blurs[0].value}px`);

    output[1].innerHTML = `${invert[0].value}`;
    root.style.setProperty('--invert', `${invert[0].value}%`);

    output[2].innerHTML = `${sepia[0].value}`;
    root.style.setProperty('--sepia', `${sepia[0].value}%`);

    output[3].innerHTML = `${saturate[0].value}`;
    root.style.setProperty('--saturate', `${saturate[0].value}%`);

    output[4].innerHTML = `${hue[0].value}`;
    root.style.setProperty('--hue', `${hue[0].value}deg`);
  };



  
  btnReset.addEventListener('click', function (event) {
    blurs[0].value = 0;
    root.style.setProperty('--blur', `0px`);
    invert[0].value = 0;
    root.style.setProperty('--invert', `0%`);
    sepia[0].value = 0;
    root.style.setProperty('--sepia', `0%`);
    saturate[0].value = 100;
    root.style.setProperty('--saturate', `100%`);
    hue[0].value = 0;
    root.style.setProperty('--hue', `0deg`);
    output.forEach(el => {
        output[0].innerHTML = `${blurs[0].value}`;
        output[1].innerHTML = `${invert[0].value}`
        output[2].innerHTML = `${sepia[0].value}`;
        output[3].innerHTML = `${saturate[0].value}`;
        output[4].innerHTML = `${hue[0].value}`;
    })

  });

let day
let pic = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' , '13', '14', '15' ,'20'].sort(() => Math.random() - 0.5).concat(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12' , '13', '14', '15' ,'20'].sort(() => Math.random() - 0.5)); 
  function showTime() {
    today = new Date(),
    hour = today.getHours()
    setTimeout(showTime, 1000)      
    function timeofday() {
        if (hour < 6) {
            day = 'night';
        } else if (hour < 12) {
            day = 'morning';    
        } else if (hour < 18) {
            day = 'day';
        } else if (hour < 24) {
            day = 'evening';
        }
    };
    timeofday()
}
showTime()

let i = 0
function background() {  
    const img = new Image();
    img.src = `./assets/img/${day}/${pic[i]}.jpg`;
    img.onload = () => {      
        images.src = `./assets/img/${day}/${pic[i]}.jpg`;
        
    }; 
  } 
background() 
let test


upload.addEventListener('change', function(e) {
  const file = upload.files[0];
  const reader = new FileReader();
  reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      test = `${reader.result}` 
      images.src = `${reader.result}`
      drawImage()
           
         
  }
 
  reader.readAsDataURL(file);

  
});


let img2
function drawImage() {
  img2 = new Image();
  img2.setAttribute('crossOrigin', 'anonymous'); 
  img2.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${day}/${pic[i]}.jpg`;
  img2.onload = function() {
    canvas.width = img2.width;
    canvas.height = img2.height;
    const ctx = canvas.getContext("2d");
    if (test) {
    img2.src = test
    ctx.drawImage(img2, 0, 0);
    } else {
      ctx.drawImage(img2, 0, 0);
    }
    
    
  };  
}
drawImage();



nextImg.onclick = function() {
  test = 0
    if (i < 20) {
        i++
        background()
        drawImage()
    } else {
        i = 0
        background()
        drawImage()
    }

  };



  download.addEventListener('click', function(e) {
    var link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  });