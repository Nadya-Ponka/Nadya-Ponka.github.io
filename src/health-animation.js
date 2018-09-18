import { makeSounds } from './utils';

export default function health(div3, div4) {
    document.querySelector(`${div3}`).style.display = 'none';
    document.querySelector(`${div4}`).style.display = 'block';

    setTimeout(
        () => {
            makeSounds('../sound/Music_Box.mp3');
            document.querySelector(`${div4}`).style.display = 'none';
        },
        2500,
    );
}
