const click = document.querySelector('#click');
const clickBox = document.querySelector('#clickBox');

const dblclick = document.querySelector('#dblclick');
const dblclickBox = document.querySelector('#dblclickBox');

const mousedown = document.querySelector('#mousedown');
const mousedownBox = document.querySelector('#mousedownBox');

const mouseup = document.querySelector('#mouseup');
const mouseupBox = document.querySelector('#mouseupBox');

const mousemove = document.querySelector('#mousemove');
const mousemoveBox = document.querySelector('#mousemoveBox');

const mouseover = document.querySelector('#mouseover');
const mouseoverBox = document.querySelector('#mouseoverBox');

const mouseout = document.querySelector('#mouseout');
const mouseoutBox = document.querySelector('#mouseoutBox');

const contextmenu = document.querySelector('#contextmenu');
const contextmenuBox = document.querySelector('#contextmenuBox');



click.addEventListener('click', () => {
  clickBox.innerHTML = 'clicked';
  setTimeout(() => {
    clickBox.innerHTML = '';
  }, 500);      
});

dblclick.addEventListener('dblclick', () => {
  dblclickBox.innerHTML = 'double clicked';
  setTimeout(() => {
    dblclickBox.innerHTML = '';
  }, 500);      
});

mousedown.addEventListener('mousedown', () => {
  mousedownBox.innerHTML = 'mouse down';
  setTimeout(() => {
    mousedownBox.innerHTML = '';
  }, 500);      
});

mouseup.addEventListener('mouseup', () => {
  mouseupBox.innerHTML = 'mouse up';
  setTimeout(() => {
    mouseupBox.innerHTML = '';
  }, 500);      
});

mousemove.addEventListener('mousemove', () => {
  mousemoveBox.innerHTML = 'mouse move';
  setTimeout(() => {
    mousemoveBox.innerHTML = '';
  }, 500);      
});

mouseover.addEventListener('mouseover', () => {
  mouseoverBox.innerHTML = 'mouse over';
  setTimeout(() => {
    mouseoverBox.innerHTML = '';
  }, 500);      
});

mouseout.addEventListener('mouseout', () => {
    mouseoutBox.innerHTML = 'mouse out';
    setTimeout(() => {
        mouseoutBox.innerHTML = '';
    }, 500);      
    });

contextmenu.addEventListener('contextmenu', () => {
  contextmenuBox.innerHTML = 'context menu';
  setTimeout(() => {
    contextmenuBox.innerHTML = '';
  }, 500);      
});