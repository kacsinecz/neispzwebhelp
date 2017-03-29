var chapters = [
    { name:"Úvod k príručke:",
      help_page:"subhtml/uvod_tutorial.htm",  
      parts:[{text:"- Úvod",bold:false},{text:"- Užívatelia",bold:false},{text:"- Prihlásenie sa do systému",bold:false},{text:"- Stav inventúry",bold:false}]  
    },
    { name:"Hlavné menu:",
      help_page:"subhtml/hlavne_menu_tutorial.htm",
      parts:[{text:"- Popis hlavného menu",bold:false},{text:"- Popis hlavičky (celkové emisie prevádzkovateľa)",bold:false}]
    },
    { name:"Navigácia a ikony tlačidiel:",
      help_page:"subhtml/navigacia_tutorial.htm",
      parts:[{text:"- Navigácia v stromovej štruktúre zdrojov",bold:false},{text:"- Ikony tlačidiel na formulároch",bold:false}]
    },
    { name:"Formulár prevádzkovateľa:",
      help_page:"subhtml/prevadzkovatel_tutorial.htm",  
      parts:[{text:"- popis formulára",bold:false}]
    }
];

var div_height = 164;
var div_width = 332;
var div_margin = 5;
var max_column = 3;
var column = 0;
var row = 0;
var count_div = 0;
var div_heights = [];
var div_tables = [];
var help_pages = [];

chapters.forEach(function(element) {
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    table.appendChild(tr);
    var th = document.createElement("th");
    var textnode = document.createTextNode(element.name);
    th.appendChild(textnode);
    tr.appendChild(th);
    element.parts.forEach(function(part){
        tr = document.createElement("tr");
        var td = document.createElement("td");
        tr.appendChild(td);
        table.appendChild(tr);
        if(!part.bold) {
            textnode = document.createTextNode(part.text);
            td.appendChild(textnode);
            
        }
        else {
            var bold = document.createElement("b");
            td.appendChild(bold);
            textnode = document.createTextNode(part.text);
            bold.appendChild(textnode);
        }
    });
    
    var div = document.createElement("div");
    count_div++;
    div.id = "div" + count_div; 
    div.style.width = div_width + "px";
    
    div.appendChild(table);
        
    var mainDiv = document.getElementById("main-div");
    mainDiv.style.width = (max_column * div_width + (max_column + 1) * div_margin + 2 * max_column) + "px";
    mainDiv.appendChild(div);
    
    if(column === max_column)
    {
        column = 0;
        row++;
    }
    
    div.style.left = (column * div_width + (column + 1)*(div_margin + 1)) + "px";
    div.style.top = (row * div_height + (row + 1)*(div_margin + 1)) + "px";
    column++;
    div.addEventListener("click",divClicked);
        
    tt = table.getBoundingClientRect();
    var table_height = tt.bottom - tt.top;
    
    /* programovo: vypocitat dynamicku vysku DIV, t.j. dynamicka_vyska:(164 + vyska_tabulky)/2
    a potom padding: padding = 164 - dynamicka_vyska 
    takto bude zabezpecene, aby vysledna vyska bola vzdy 164px*/
    var h = (div_height + table_height) / 2;
    
    div_heights[div.id] = h;
    div_tables[div.id] = table;
    help_pages[div.id] = element.help_page;
    
    div.style.height = h + "px";
    div.style.paddingTop =  (div_height - h) + "px";
                   
});

function divClicked(event) {
    var r = 0;
    var array = document.getElementById("main-div").getElementsByTagName("div");
    for(var i=0;i<array.length;i++) {
        if(array[i].id === this.id) {
            array[i].style.left = (div_margin + 1) + "px";
            var table = array[i].getElementsByTagName("table");
            
            var ifrnode = document.createElement("iframe");
            ifrnode.src = help_pages[array[i].id];
            array[i].replaceChild(ifrnode,table[0]);
            
            array[i].style.paddingTop =  "0px";
            array[i].style.width = (2*div_width + 2*(div_margin+1)) + "px";
            array[i].style.height = (window.innerHeight - 2 * (div_margin + 1)) + "px";
            array[i].style.top = (div_margin + 1) + "px";
        }
        else {
            array[i].style.left = ((max_column - 1) * div_width + (max_column + 1)*(div_margin + 1)) + "px";
            array[i].style.top = (r * div_height + (r + 1)*(div_margin + 1)) + "px";
            array[i].style.width = div_width + "px";
            array[i].style.height = div_heights[array[i].id] + "px";
            array[i].style.paddingTop =  (div_height - div_heights[array[i].id]) + "px";
            
            var ifr = array[i].getElementsByTagName("iframe");
            if(ifr.length !== 0)   {
                array[i].replaceChild(div_tables[array[i].id],ifr[0]);
            }
            r++;
        }
    }
}


