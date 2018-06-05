export default function health(div3, div4) {
    document.querySelector(`${div3}`).style.display = 'none';
    document.querySelector(`${div4}`).style.display = 'block';

    setTimeout(function () {
            document.querySelector(`${div4}`).style.display = 'none';
        },
        2000);
}
