//한 끼 둘러보기 이미지 변수
let img_search;
let img_words;
let img_feed1;
let img_feed2;

//우리집 냉장고 이미지 변수
let img_Expirationdate;
let img_foods;
let img_arrow;

//냉장고 파먹기 이미지 변수
//기존 이미지와 중복이라서 공란처리

//냉장고 채우기 이미지 변수
let img_list;
let img_stuff;
let img_stuff2;

//나의 리스트 이미지 
let img_check;
let img_uncheck;
let img_list1;
let img_list2;
let img_list3;
let img_list4;
let img_list5;
let img_list6;
let img_list7;
let img_back;

let list_info;

//밥 짓는 중 이미지 
let img_bri;
let img_portion;
let img_minute;
let img_level;

//식탁 친구들 이미지 변수
let img_r_feed;
let img_hotfeed;
let img_bell;

//나의 밥상 이미지 변수
let img_review;
let img_nutrients; 
let img_recommends;

//밥 짓는 중 이미지 변수
let img_thumbnail;
let img_recipieInfo;
let img_ingredients;

//네비게이션 바 이미지 변수
let img_nav0;
let img_nav0_on;
let img_nav1;
let img_nav2;
let img_nav3;
let img_nav4;
let img_btmLine;
let img_topBar;
let img_topMenu;

//AI 소환 이미지 변수
let aiIcon;
let greenBg;
let ChatIcon;
let bg;

let scrollY = 0;

let state = 0;
let aiState = 0;

// let pageHistory = [];
// let pageHistoryIndex = 0;
let previousState;

let apiKey = "AIzaSyCZHoKZDZgJQMEVHCZU4WiU5f0VUBW5Sv8";
const systemPrompt = "You are a helpful AI cooking assistant, as a pro chef; given the information in the PDF file, please provide accurate responses in fewer than three sentences. If you get asked for further advises, please refer to the other informations written on the PDF file. Focus on the user's current situation, and provide appropriate answers in Korean. If the user asks for recipe recommendations, try to focus on the name of the recipe, not the ingredients.";
let conversationHistory = [];
let chatBotConversation = [];
let ai_response;

let pdfInput;
let encodedPDF = null;
let pdfAdded = false;

function preload() {
  //한 끼 둘러보기 이미지 불러오기
  img_search = loadImage("search.png");
  img_words = loadImage("words.png");
  img_feed1 = loadImage("feed1.png");
  img_feed2 = loadImage("feed2.png");
  
  //우리 집 냉장고 이미지 불러오기
  img_Expirationdate = loadImage("Expirationdate.png");
  img_foods = loadImage("foods.png");
  img_arrow = loadImage("arrow.png");
  
  //냉장고 파먹기 이미지 불러오기
  img_darrow = loadImage("d_arrow.png");
  
  //냉장고 채우기 이미지 불러오기
  //img_search = loadImage("search.png");
  img_list = loadImage("list.png");
  img_stuff = loadImage("stuff.png");
  img_stuff2 = loadImage("stuff2.png");
  
  //나의 리스트 이미지 불러오기
  img_check = loadImage("check.png");
  img_uncheck = loadImage("uncheck.png");
  img_list1 = loadImage("list1.png");
  img_list2 = loadImage("list2.png");
  img_list3 = loadImage("list3.png");
  img_list4 = loadImage("list4.png");
  img_list5 = loadImage("list5.png");
  img_list6 = loadImage("list6.png");
  img_list7 = loadImage("list7.png");
  img_back = loadImage("back.png");
  
  list_info = [[img_list1, '양파', '8개', 0], [img_list2, '굴소스', '1개', 1], [img_list3, '파마산 치즈', '1개', 1], [img_list4, '맛간장', '1개', 0], [img_list5, '다진 마늘', '2팩', 0], [img_list6, '페퍼론치노', '1개', 1], [img_list7, '식물성 버터', '1개', 0]];
  
  //식탁 친구들 이미지 불러오기
  img_r_feed = loadImage("r_feed.png");
  img_hotfood = loadImage("hotfood.png");
  img_bell = loadImage("bell.png");
  
  //나의 밥상 이미지 불러오기
  img_review = loadImage("weekly_review.png");
  img_nutrients = loadImage("nutrients.png");
  img_recommends = loadImage("recommend.png");
  
  //밥 짓는 중 이미지 불러오기
  img_thumbnail = loadImage("thumbnail.png");
  img_recipieInfo = loadImage("recipie_info.png");
  img_ingredients = loadImage("ingredients.png");
  
  //네비게이션 바 이미지 불러오기
  img_nav0 = loadImage("nav.png");
  img_nav0_on = loadImage("nav_on.png");
  img_nav1 = loadImage("nav1.png");
  img_nav2 = loadImage("nav2.png");
  img_nav3 = loadImage("nav3.png");
  img_nav4 = loadImage("nav4.png");
  img_btmLine = loadImage("btm_line.png");
  img_topBar = loadImage("top_bar.png");
  img_topMenu = loadImage("top menu.png");
  
  //맞춤밥 이미지 불러오기
  aiIcon = loadImage("Machoombap.png");
  bg = loadImage("GreenBg.png");
  ChatIcon = loadImage("ChatIcon.png");
  aiBg = loadImage("bg.png");

}

function setup() {
  createCanvas(393, 852);
  textWrap(WORD);
  
  if (!("webkitSpeechRecognition" in window)) {
    console.log("Speech recognition is not supported in this browser.");
    noLoop();
  } else {
    speechRecognition = new webkitSpeechRecognition();
    speechRecognition.lang = "ko-KR";
    speechRecognition.continuous = true;
    speechRecognition.onresult = speechResult;
  }

  pdfInput = createFileInput(handleFile);
  pdfInput.attribute("accept", ".pdf");
  pdfInput.style("opacity", "0");
  pdfInput.style("position", "absolute");
  pdfInput.position(width - 100, 0);
  pdfInput.size(100, 100);
}

function draw() {
  background(255);
  textFont("Pretendard");
  
  //한 끼 둘러보기 UI
  if (state == 0){    
    image(img_words, 15, 98, 363, 437);
    image(img_feed1, 15, 274, 527, 207);
    image(img_feed2, 15, 545, 530, 229);
  }
  
  //우리 집 냉장고 UI 
  else if(state == 1){
    image(img_foods, 15, 519, 363, 237);
    image(img_Expirationdate, 15, 211, 363, 247);

    generateText([7, 121, 65], 15, 1, "냉장고 보기", 17, 122);
    generateText([102, 102, 102], 15, 0, "파먹기", 106, 122);
    generateText([102, 102, 102], 15, 0, "채우기", 165, 122);
    
    fill(8, 121, 64);
    noStroke();
    rect(17, 128, 72, 3);
    
    generateText([7, 121, 65], 12.15, 0, "전체보기", 322, 185);
    image(img_arrow, 373, 175, 5, 10);
    
    generateText([0, 0, 0], 20, 1, "유통기한", 15, 163);
    generateText([122, 122, 122], 12, 0, "유통기한에 임박한 재료들을 확인해 보세요", 15, 186);

    generateText([0, 0, 0], 20, 1, "냉장고 재료 확인하기", 15, 500);
    generateText([7, 121, 65], 12.15, 0, "전체보기", 322, 500);
    image(img_arrow, 373, 490, 5, 10);
  }
  
  //냉장고 채우기 UI
  else if(state == 2){
    generateText([102, 102, 102], 15, 0, "냉장고 보기", 17, 122);
    generateText([102, 102, 102], 15, 0, "파먹기", 106, 122);
    generateText([7, 121, 65], 15, 1, "채우기", 165, 122);
    
    fill(8, 121, 64);
    noStroke();
    rect(165, 128, 41, 3);
    
    generateText([7, 121, 65], 20, 1, "장보러 가기 전 우리 함께 장보기 \n리스트를 작성해볼까요? ", 17, 169);

    noFill();
    stroke(7, 121, 65);
    rect(15, 214, 299, 41, 30);
    image(img_search, 279, 226, 17, 17);
    generateText([162, 162, 162], 10, 0, "이번 주 요리에서 새롭게 필요한 재료가 있었나요? ", 33, 239);
    
    image(img_list, 325, 207, 53, 53);

    generateText([0, 0, 0], 20, 1, "재료 담기", 15, 290);
    generateText([0, 0, 0], 15, 1, "이 재료는 새롭게 사보는게 어떼요?", 15, 319);
    generateText([122, 122, 122], 12, 0, "리스트에 꼭 들어가면 좋을 새로운 재료 추천", 15, 338);

    image(img_stuff, 15, 362, 362, 151);

    generateText([0, 0, 0], 15, 1, "이번주 재료 추천", 17, 570);
    generateText([122, 122, 122], 12, 0, "이런 재료로 음식을 자주 만들었어요", 17, 589);
    
    image(img_stuff2, 15, 601, 362, 150);
  }
  
  //냉장고 파먹기 UI
  else if(state == 3){
    image(img_foods, 15, 251, 363, 237);
    
    generateText([102, 102, 102], 15, 0, "냉장고 보기", 17, 122);
    generateText([7, 121, 65], 15, 1, "파먹기", 106, 122);
    generateText([102, 102, 102], 15, 0, "채우기", 165, 122);
    
    fill(8, 121, 64);
    noStroke();
    rect(107, 128, 41, 3);
    
    generateText([7, 121, 65], 20, 1, "냉장고 속의 재료를 선택하면 \n최적의 레시피를 추천해 드려요", 17, 173);

    fill(7, 121, 65);
    noStroke();
    rect(17, 207, 111, 30, 5);

    generateText([255, 255, 255], 11, 0, "유통기한임박순", 29, 227);
    image(img_darrow, 107, 220, 9, 4.45);

    generateText([7, 121, 65], 12.15, 0, "전체보기", 322, 232);
    image(img_arrow, 373, 222, 5, 10);
    
    generateText([0, 0, 0], 20, 1, "직접 입력", 15, 538);
    generateText([102, 102, 102], 12, 0, "추가하고 싶은 재료나 제외하고 싶은 재료가 있나요?", 15, 558);
    generateText([102, 102, 102], 15, 1, "냉장고 재료", 15, 587);
    generateText([102, 102, 102], 12, 0, "추가하고 싶은 재료를 입력해 주세요!", 34, 623);
    generateText([102, 102, 102], 15, 1, "제외 재료", 15, 667);
    generateText([102, 102, 102], 12, 0, "제외하고 싶은 재료를 입력해 주세요!", 34, 702);

    // 박스
    noFill();
    stroke(8, 118, 63);
    strokeWeight(2);
    rect(15, 594, 361, 50, 10);
    
    stroke(174, 223, 168);
    rect(15, 674, 361, 50, 10);
  }
  else if(state == 4){ //나의 리스트
    for(let i = 0 ; i < 7 ; i += 1) {
      if(list_info[i][3]){
        fill(8,118,63);
        noStroke();
        rect(29, 205 + 90 * i + scrollY, 335, 80, 8);
        
        image(img_check, 315, 240 + 90 * i + scrollY, 18, 12);
        
        generateScrollableText([255, 255, 255], 15, 0, list_info[i][1], 120, 241 + 90 * i);
        generateScrollableText([255, 255, 255], 12, 0, '수량: ' + list_info[i][2], 120, 262 + 90 * i);
      }
      else{
        noFill();
        stroke(174, 223, 168);
        strokeWeight(1.5);
        rect(29, 205 + 90 * i + scrollY, 335, 80, 8);
        
        image(img_uncheck, 304, 226 + 90 * i + scrollY, 40, 40);
        
        generateScrollableText([0, 0, 0], 15, 0, list_info[i][1], 120, 241 + 90 * i);
        generateScrollableText([0, 0, 0], 12, 0, '수량: ' + list_info[i][2], 120, 262 + 90 * i);
      }
        
      image(list_info[i][0], 43, 216 + 90 * i + scrollY, 60, 60);
      
    }
    
    fill(255);
    noStroke();
    rect(0, 0, width, 190);

    generateText([102, 102, 102], 15, 0, "냉장고 보기", 17, 122);
    generateText([102, 102, 102], 15, 0, "파먹기", 106, 122);
    generateText([7, 121, 65], 15, 1, "채우기", 165, 122);
    
    fill(8, 121, 64);
    noStroke();
    rect(165, 128, 41, 3);
    
    generateText([0, 0, 0], 20, 1, "나의 리스트", 15, 159);
    generateText([146, 146, 146], 15, 1, "이번 주 수정님이 장 볼 리스트에요!", 15, 182);
  }
  else if(state == 5){//식탁 친구들

    generateText([7, 121, 65], 15, 1, "커뮤니티", 15, 122);
    generateText([102, 102, 102], 15, 0, "숏폼 인증", 87, 122);
    generateText([102, 102, 102], 15, 0, "친구 공유", 163, 122);
    
    fill(8, 121, 64);
    noStroke();
    rect(15, 128, 55, 3);
    
    
    generateText([0, 0, 0], 20, 1, "이번주 히든 레시피", 15, 169);
    generateText([8, 121, 64], 20, 1, "Top 5", 166, 169);

    image(img_r_feed, 15, 183, 378, 278);
    
    generateText([0, 0, 0], 20, 1, "지금 가장 인기있는 요리 후기는?", 15, 511);
    
    generateText([7, 121, 65], 12.15, 0, "전체보기", 329, 509);
    image(img_arrow, 380, 500, 5, 10);

    image(img_hotfood, 15, 525, 296, 266);
  }
  else if(state == 6){//나의 밥상
    fill(237, 237, 237);
    noStroke();
    rect(15, 100, 363, 38, 10);
    
    fill(7, 121, 65);
    rect(145, 102, 104, 34, 10);
    
    generateText([163, 163, 163], 14, 1, "Today", 60, 124);
    generateText([255, 255, 255], 14, 1, "Week", 178, 124);
    generateText([163, 163, 163], 14, 1, "Month", 286, 124);
    
    image(img_review, 15, 148, 368, 168);
    
    generateText([0, 0, 0], 20, 1, "섭취한 영양소", 15, 366);
    generateText([0, 0, 0], 12, 0, "단잭질 섭취가 40%로 가장 부족한 상태예요", 15, 382);
    
    image(img_nutrients, 15, 400, 378, 145);
    
    generateText([0, 0, 0], 20, 1, "나에게 필요한 레시피", 15, 591);
    generateText([0, 0, 0], 12, 0, "단백질이 풍부한 음식을 통해 부족한 영양소를 채워보세요", 15, 607);
    
    image(img_recommends, 15, 625, 296, 227);
    
    fill(7, 121, 65);
    rect(281, 689, 102, 49, 25.5);
    generateText([255, 255, 255], 25, 0, "+", 299, 723);
    generateText([255, 255, 255], 16, 0, "글쓰기", 321, 720);
    
  }
  else if(state == 7){//밥 짓는 중
    image(img_thumbnail, 0, 48, width, 307);
    
    image(img_back, 15, 379, 7.5, 15);
    generateText([7, 121, 65], 20, 1, "새우 볶음밥", 44, 395);
    generateText([0, 0, 0], 20, 1, "새우볶음밥 만들기, 부들부들한 계란과\n탱글한 새우의 환상적인 조화!", 15, 446);
    generateText([102, 102, 102], 13, 0, "유통기한이 2일 남은 계란과 유통기한이 4일 남은\n냉동 새우를 활용한 계란 새우 볶음밥 레시피 어때요?", 15, 505);
    
    image(img_recipieInfo, 58, 568, 277, 26);
    generateText([102, 102, 102], 12, 0, "1인분", 59, 623);
    generateText([102, 102, 102], 12, 0, "20분 이내", 175, 623);
    generateText([102, 102, 102], 12, 0, "초급", 313, 623);
    
    generateText([0, 0, 0], 20, 1, "재료 확인하기", 15, 672);
    generateText([163, 163, 163], 10, 0, "전체보기", 339, 671);
    
    image(img_ingredients, 26, 682, 326, 140);
  }
  
  else if (state == 8) { //맞춤밥 채팅
    image(aiBg, 0, 0, width, height);
    let sumOfTextLines = 0;
    let textLines;
    textStyle(NORMAL);
    
    for (let i = 0 ; i < chatBotConversation.length ; i += 1) {
      textSize(12);
      
      if (chatBotConversation[i][0]){ // 사람(1) 대화기록
        //textLines = cntLines(chatBotConversation[i][1]);
        textLines = cntLines(chatBotConversation[i][1]);
        
        noStroke();
        fill(172, 223, 167);
        rect(width - (textLines < 2 ? textWidth(chatBotConversation[i][1]) : 250) - 48 - 13.5, 140 + 61 * i + scrollY + sumOfTextLines * 14.4 - 10, (textLines < 2 ? textWidth(chatBotConversation[i][1]) : 250) + 27, textLines * 14.4 + 35, 30, 10, 0, 30);
        
        fill(0, 0, 0);
        
        text(chatBotConversation[i][1], width - (textLines < 2 ? textWidth(chatBotConversation[i][1]) : 250) - 48, 140 + 61 * i + scrollY + sumOfTextLines * 14.4, 250);
        
        if (textLines > 1) {
          sumOfTextLines += textLines;
        }
      }
      
      else{ // AI(0) 대화기록
        textLines = textWidth(chatBotConversation[i][1]) / 250 - textWidth(chatBotConversation[i][1]) / 250 % 1;
        
        noStroke();
        fill(8, 120, 64);
        rect(48 - 13.5, 140 + 61 * i + scrollY + sumOfTextLines * 14.4 - 10, (textLines < 2 ? textWidth(chatBotConversation[i][1]) : 250) + 27, textLines * 14.4 + 35, 10, 30, 30, 0);
        
        fill(255, 255, 255);
        text(chatBotConversation[i][1], 48, 140 + 61 * i + scrollY + sumOfTextLines * 14.4, 250);
        if (textWidth(chatBotConversation[i][1]) > 250) {
          sumOfTextLines += textLines - 1;
        }
      }
    }
    
    noStroke();
    fill(255, 255, 255);
    rect(0, 0, width, 120);
    
    image(img_back, 15, 73, 7.5, 15);
    generateText([7, 121, 65], 20, 1, "채팅 나가기", 44, 89);
  }
  
  //AI가 켜졌을 때
  if(aiState){
    image(bg, 0, 564, 393, 291);
    image(aiIcon, 75, 292, 244, 244);
    image(img_back, 15, 73, 7.5, 15);
  }
  
  if(!aiState){ //네비게이션 바
    if (state == 0){
      image(img_nav1, 0, 734, 403, 123);
    }
    else if (state == 1 || state == 2 || state == 3 || state == 4){
      image(img_nav2, 0, 734, 403, 123);
    }
    else if (state == 5){
      image(img_nav3, 0, 734, 403, 123);
    }
    else if (state == 6){
      image(img_nav4, 0, 734, 403, 123);
    }
    else if (state == 7 || state == 8){
      image(img_nav0, 0, 734, 403, 123);
    }
  }
  
  if (state != 7 && state != 8 && !aiState) {
    image(img_topMenu, 15, 52, 356, 37);
  }
  
  //전 화면 
  image(img_btmLine, 125, 839, 143, 5);
  image(img_topBar, 0, 0, 393, 48);
}

// function cntLines(textArray) { //텍스트 글자줄세기 
//   let textlen = 0;
//   let latestSpace = 0;
//   let lineCnt = 0;
  
//   let splitArray = textArray.split("\n");
  
//   for(let i = 0 ; i < splitArray.length ; i += 1) {
//     if (i != 0)
//       lineCnt += 1;
//     console.log(splitArray[i]);
//     let tempArray = splitArray[i];
//     for (let j = 0 ; j < tempArray.length ; j += 1) {
//       //console.log(tempArray[j], j);
//       if (tempArray[j] == '\n'){
//         lineCnt += 1;
//         textlen = 0;
//       }

//       textlen += textWidth(tempArray[j]);

//       if(tempArray[j] == ' '){
//         latestSpace = j;
//       }

//       if (textlen > 250) {
//         lineCnt += 1;
//         textlen = 0;
//         j = latestSpace + 1;
//       }
//       //console.log(lineCnt);
//     }
//     //console.log(lineCnt);
//   }
//   return lineCnt;
// }

function cntLines(textArray) { //텍스트 글자줄세기 
  let textlen = 0;
  let latestSpace = 0;
  let lineCnt = 0;
  let splitArray = textArray.split("\n");
  console.log(splitArray);
  
  for(let i = 0 ; i < splitArray.length ; i += 1) {
    textlen = 0;
    latestSpace = 0;
    lineCnt += 1;
    //console.log(splitArray[i]);
    let tempArray = splitArray[i];
    for (let j = 0 ; j < tempArray.length ; j += 1) {
      //console.log(j, lineCnt, tempArray[j], textlen, latestSpace);
      textlen += textWidth(tempArray[j]);

      if(tempArray[j] == ' '){
        latestSpace = j;
      }

      if (textlen >= 250) {
        lineCnt += 1;
        textlen = 0;
        j = latestSpace;
        //console.log(tempArray[j]);
      }
    }
  }
  return lineCnt - 1;
}

// function wrapText(txt, maxWidth) {
//   let enters = txt.split("\n");
//   let words = txt.split(' ');
//   let lines = [];
//   let currentLine = '';

//   for (let word of words) {
//     let testLine = currentLine + word + ' ';
//     if (textWidth(testLine) > maxWidth && currentLine !== '') {
//       lines.push(currentLine.trim());
//       currentLine = word + ' ';
//     } else {
//       currentLine = testLine;
//     }
//   }

//   lines.push(currentLine.trim());
  
//   let lineNumbers = lines.length + (enters.length - 1);
//   return lineNumbers;
// }

// function calculateTextHeight(lines){
//   let oneLineHeight = textAscent() + textDescent();
//   let totalLineHeight = oneLineHeight * lines;
  
//   return totalLineHeight;
  
// }

function generateText(fillColor, sizeOfText, isBold, toWrite, textX, textY){
  noStroke();
  if (fillColor[0] == fillColor[1] && fillColor[0] == fillColor [2])
    fill(fillColor[0]);
  else
    fill(fillColor[0], fillColor[1], fillColor[2]);
  textSize(sizeOfText);
  if(isBold)
    textStyle(BOLD);
  else
    textStyle(NORMAL);
  text(toWrite, textX, textY);
}

function generateScrollableText(fillColor, sizeOfText, isBold, toWrite, textX, textY){
  noStroke();
  if (fillColor[0] == fillColor[1] && fillColor[0] == fillColor [2])
    fill(fillColor[0]);
  else
    fill(fillColor[0], fillColor[1], fillColor[2]);
  textSize(sizeOfText);
  if(isBold)
    textStyle(BOLD);
  else
    textStyle(NORMAL);
  text(toWrite, textX, textY + scrollY);
}


function mouseClicked() {  
  if (mouseX >= 162 && mouseX <= 162 + 70 && mouseY >= 760 && mouseY <= 760 + 70) { //AI 버튼
    if (!aiState) {
      aiState = 1;
      startSpeechRecognition();
    } else if (aiState == 2) {
      aiState = 0;
    }
  }
  if (mouseX >= 75 && mouseX <= 75 + 244 && mouseY >= 292 && mouseY <= 292 + 244) { //맞춤밥 아이콘
    if (state != 8 && aiState){
      previousState = state;
      state = 8;
    }
    else if(aiState) {
      speechRecognition.stop();
      aiState = 0;
    }
  }
  else if (mouseX >= 11 && mouseX <= 11 + 16){ //뒤로가기
    if(mouseY >= 378 && mouseY <= 378 + 16 && state == 7){
      state = previousState;
    }
    else if(mouseY >= 73 && mouseY <= 73 + 15){
      console.log("back");
      if (aiState){
        speechRecognition.stop();
        aiState = 0;
      }
      else if (state == 8) {
        state = previousState;
      }
    }
  }
  else if (state == 4 && mouseY > 190 && mouseY < 734){
    if(mouseX >= 29 && mouseX <= 29 + 335) {
      if((mouseY - 180) % 90 <= 80){
        let scrolledY = mouseY - 180 - scrollY;
        let listIndex = int(scrolledY / 90 - (scrolledY / 90) % 1);
        if (listIndex >= 0 && listIndex <= 6) {
          if(list_info[listIndex][3])
            list_info[listIndex][3] = 0;
          else
            list_info[listIndex][3] = 1;
        }
      }
    }
  }
  else{
    if (mouseY >= 780 && mouseY <= 780 + 51){ //네비게이션 바
      if (mouseX >= 26 && mouseX <= 26 + 30) state = 0;
      else if (mouseX >= 103 && mouseX <= 103 + 30) state = 1;
      else if (mouseX >= 258 && mouseX <= 258 + 30) state = 5;
      else if (mouseX >= 337 && mouseX <= 337 + 30) state = 6;
    }
    else if (state == 1 || state == 2 || state == 3 || state == 4){ //우리집 냉장고 화면
      if (state == 1 && mouseX > 325 && mouseX < 325 + 52 && mouseY > 296 && mouseY < 296 + 76){
        previousState = state;
        state = 7;
      }
      else if(state == 3 && mouseX >= 15 && mouseX <= 15 + 83.46 && mouseY >= 251 && mouseY <= 251 + 114){
        previousState = state;
        state = 7;
      }
      else if (mouseY >= 97 && mouseY <= 97 + 18){
        if(mouseX >= 15 && mouseX <= 15 + 69) state = 1;
        else if(mouseX >= 100 && mouseX <= 145) state = 3;
        else if(mouseX >= 158 && mouseX <= 158 + 45) state = 2;
      }
      else if (state == 2){ //냉장고 채우기 화면
        if(mouseX >= 325 && mouseX <= 325 + 53){
          if(mouseY >= 207 && mouseY <= 207 + 53) state = 4;
        }
      }
    }
  }
}

function mouseWheel(event) {
  if (event.delta > 0) {
    scrollY -= 25;
  }
  else
    if (scrollY < 0) scrollY += 25;
}

function handleFile(file) {
  if (file.type === "application/pdf" || (file.name && file.name.toLowerCase().endsWith(".pdf"))) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      encodedRecipe = dataUrl.split(",")[1];
      console.log("✅ PDF 업로드 완료!");
    };
    reader.readAsDataURL(file.file);
  } else {
    console.log("❌ PDF 파일만 업로드 가능합니다.");
  }
}

function startSpeechRecognition() {
  if (speechRecognition) speechRecognition.start();
}

function speechResult(event) {
  const speechInput = Array.from(event.results).map((r) => r[0].transcript).join("");
  if (event.results[event.results.length - 1].isFinal) {
    chatBotConversation.push([1, speechInput]);
    console.log(speechInput)
    generateResponse(speechInput);
    aiState = 0;
    speechRecognition.stop();
  }
}

async function generateResponse(question) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;
  conversationHistory = [];

  if (encodedRecipe) {
    conversationHistory.push({
      role: "user",
      parts: [{ inline_data: { mime_type: "application/pdf", data: encodedRecipe } }],
    });
  }

  conversationHistory.push({ role: "user", parts: [{ text: question }] });

  const requestBody = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: conversationHistory,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    ai_response = data?.candidates?.[0]?.content?.parts?.[0]?.text || "응답을 찾을 수 없어요.";
    aistate = 2;
    chatBotConversation.push([0, ai_response]);
    console.log(ai_response);
    speakText(ai_response);
  } catch (error) {
    console.log("Gemini 오류:", error.message);
  }
}

async function speakText(text) {
  const ttsUrl = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`;
  const body = {
    audioConfig: { audioEncoding: "MP3", pitch: 0, speakingRate: 1 },
    input: { text },
    voice: { languageCode: "ko-KR", name: "ko-KR-Chirp3-HD-Zephyr" }
  };

  try {
    const res = await fetch(ttsUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (data.audioContent) new Audio("data:audio/mp3;base64," + data.audioContent).play();
  } catch (e) {
    console.log("TTS 오류:", e.message);
  }
}