let windowWidth = window.innerWidth;


let openNav = function() {
  if (windowWidth >= 768) {
    document.getElementById('main').style.marginLeft = '250px';
    document.getElementById('toolbar').style.marginLeft = '250px';
  }
  document.getElementsByClassName('openBtn')[0].style.display = 'none';
  document.getElementsByClassName('closeBtn')[0].style.display = 'inline-block';
  document.getElementById('nav').style.width = '250px';
  
  let allTexts = document.getElementById('nav').getElementsByClassName("text");

  Object.keys(allTexts).forEach(function(key) {
    let ele = allTexts[key];
    ele.style.display = 'inline-block';
  });
}

let closeNav = function() {
  document.getElementsByClassName('openBtn')[0].style.display = 'inline-block';
  document.getElementsByClassName('closeBtn')[0].style.display = 'none';

  let closeWidth = '0px';
  if (windowWidth >= 768) {
    closeWidth = '50px';
  } 
  document.getElementById('nav').style.width = closeWidth;
  document.getElementById('main').style.marginLeft = closeWidth;
  document.getElementById('toolbar').style.marginLeft = closeWidth;
  let allTexts = document.getElementById('nav').getElementsByClassName("text");

  Object.keys(allTexts).forEach(function(key) {
    let ele = allTexts[key];
    ele.style.display = 'none';
  });
}  
