//Сверстана кнопка, клик на которую выводит данные о размерах экрана с помощью alert.  
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    const pix = Number(1,0416);
    width = document.documentElement.clientWidth;
    height = document.documentElement.clientHeight;
    console.log(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
    console.log(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * pix);
    alert(`width: ${width}, height: ${height} \n Display size: ' +  Math.round((Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * pix/100)) + ' inch's`);
});
