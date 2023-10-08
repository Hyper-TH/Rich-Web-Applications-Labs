//array of images
let hacksImages = [
    "http://i.ytimg.com/vi/0vxCFIGCqnI/maxresdefault.jpg",
    "https://gulfsouthtech.com/wp-content/uploads/2019/01/signs-that-youve-been-hacked.jpeg",
    "https://static.vecteezy.com/system/resources/thumbnails/001/785/195/small_2x/hacker-code-running-down-free-video.jpg",
    "https://miro.medium.com/v2/resize:fit:620/1*uyeywqsZk7UaG3NYQhi89Q.png", // Remove viruses windows
	"https://miro.medium.com/v2/resize:fit:640/0*ngAthWxOvKZHvsw9",
    "https://media.istockphoto.com/id/1144604245/photo/a-computer-system-hacked-warning.jpg?s=612x612&w=0&k=20&c=U45FHOm5rflXIRqmYByxlQANtdtycEdFZz2Vp5dgI8E=",
    "https://www.wgu.edu/content/dam/web-sites/blog-newsroom/blog/images/national/2019/august/grey-hat-hacking.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrWIic4AYO3s0mN8UxOCYJr4bUDFVtioEToA&usqp=CAU",
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://e3.365dm.com/21/03/768x432/skynews-cats-missing-microchip_5315182.jpg?20210323142004",
    "https://www.thetimes.co.uk/imageserver/image/%2Fmethode%2Ftimes%2Fprod%2Fweb%2Fbin%2Fc3836660-7846-11eb-80c3-8cc375faed89.jpg?crop=5729%2C3222%2C187%2C805&resize=1200"
];

let sponsors = [
    "NordVPN",
    "LordsMobile",
    "Raid Shadow Legends",
    "Casetify",
    "Honey",
    "Shopify",
    "Temu",
    "Skillshare",
    "War Thunder",
    "GFuel",
    "DBrand",
];

// Function to generate random number
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const headers = document.getElementsByTagName("h1");
for (let i = 0; i < headers.length; i++) {
    headers[i].innerText = "You are hacked.";
}

const headers2 = document.getElementsByTagName("h2");
for (let i = 0; i < headers2.length; i++) {
    const randNum = randomNumber(0,1000);
    headers2[i].innerText = `${randNum} viruses detected in your system`;
}

const p = document.getElementsByTagName("p");
for (let i = 0; i < p.length; i++){
    p[i].style.font = "Comic Sans MS";

    const randNum1 = randomNumber(0,1000);
    const randNum2 = randomNumber(0,1000);
    const randNum3 = randomNumber(0,1000);
    p[i].innerText = `Call (${randNum1}) ${randNum2}-${randNum3} to fix your problem`;
}

const li = document.getElementsByTagName("li");
for (let i = 0; i < li.length; i++) {
    const randSponsor = Math.floor(Math.random() * sponsors.length);
    li[i].innerHTML = `Sponsored by: ${sponsors[randSponsor]}`;
}

const a = document.getElementsByTagName("a");
for (let i = 0; i < a.length; i++) {
    a[i].href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygUIcmlja3JvbGw%3D";
}

const footer = document.getElementsByTagName("footer");
for (let i = 0; i < footer.length; i++) {    
    var footText = footer[i].getElementsByTagName("p");
    for (let j = 0; j < footText.length; j++) {
        footText[j].innerHTML = "C20361521";
    }
}

const imgs = document.getElementsByTagName("img");
for (let i = 0; i < imgs.length; i++) {
    const randomImg = Math.floor(Math.random() * hacksImages.length);
    imgs[i].src = hacksImages[randomImg];
}

/* For Met Eireann Only */
var k = document.getElementsByClassName("px-2 px-lg-0");
for (let i = 0; i < k.length; i++) {
    var px2 = k[i].getElementsByTagName("p");
    for (let j = 0; j < px2.length; j++) {
        px2[j].innerHTML = "Sample Paragraph" + i + " " + j;
    }
}

