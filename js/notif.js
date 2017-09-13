'use strict';
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(let i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
Array.prototype.sum = function() {
    return this.reduce(function(a,b){return a+b;});
};
  let name="fdsujhfkdshfkj";
  let previousVal="";
////////////////////////////////
////////////////////////////////
function generateAverage(){
  let base = document.getElementById("marksForm:marksWidget:coursesTable_data")
  setTimeout(function(){ generateAverage(); }, 200);
  if(previousVal === base.innerHTML){
    return;
  }else{
    previousVal = base.innerHTML;
  }
  let valueTab=[];
  //count cc
  let count = 0;
  let txt = document.getElementsByTagName("body")[0].innerHTML;
  let regex = /(j_idt176:[0-9]+)"/g
  let match = regex.exec(txt);
  while (match != null) {
      count++;
      match = regex.exec(txt);
  }
  //count get ligne
  for (let k = 0,selectvar = "ui-widget-content ui-datatable-even odd-row"; k < 2; k++) {
    let select = base.getElementsByClassName(selectvar);
    for (let i = 0; i < select.length; i++) {
      let selectTd = select[i].getElementsByTagName("td");
      let ccValue = [];

      for (let j = 0; j < count; j++) {
        if (selectTd[4+j].innerHTML.length!=0) {
          ccValue.push(parseFloat(selectTd[4+j].innerHTML.replace(",", ".")))
        }else{
          break;
        }
      }

      valueTab.push({
        name:selectTd[0].getElementsByTagName("span")[0].innerHTML,
        coef:parseFloat(selectTd[2].innerHTML.replace(",", ".")),
        etcs:parseFloat(selectTd[3].innerHTML.replace(",", ".")),
        cc:ccValue,
        exam:parseFloat(selectTd[4+count].innerHTML.replace(",", ".")),
        tr:select[i]
      })
    }
    selectvar ="ui-widget-content ui-datatable-odd even-row";
  }
  let moyS=0
  let totC=0
  let totE=0
  for (let i = 0; i < valueTab.length; i++) {
    if(document.getElementById(name+i) != null){
      document.getElementById(name+i).remove();   
    }
    let valueTmp=null;
    if(valueTab[i].cc.length > 0){
      valueTmp = valueTab[i].cc.sum() / valueTab[i].cc.length;
      if(!isNaN(valueTab[i].exam)){
        valueTmp = (valueTmp+valueTab[i].exam)/2;
      }
    }else if(!isNaN(valueTab[i].exam)){
      valueTmp = valueTab[i].exam;
    }
    if(valueTmp!=null){
      valueTmp=(Math.round(valueTmp*100)/100)
      moyS += valueTmp * valueTab[i].coef;
      totC += valueTab[i].coef;
      totE += (valueTmp>=10)?valueTab[i].etcs:0;
      valueTab[i].tr.innerHTML+='<td id="'+(name+i)+'" role="gridcell" style="color:black;background-color:'+(valueTmp<10?"Red":(valueTmp<11?"Orange":"Green"))+';width:37px;text-align: center">'+valueTmp+'</td>';
    }else{
      valueTab[i].tr.innerHTML+='<td id="'+(name+i)+'" role="gridcell" style="color:black;width:37px;text-align: center"></td>';
    }
  }

  if(document.getElementById((name)+'moy') != null){
    document.getElementById((name)+'moy').remove();   
  }
  document.getElementById("marksForm:marksWidget:coursesTable_head").getElementsByTagName("tr")[0].innerHTML+='<th id="'+(name)+'moy" class="ui-state-default" role="columnheader" style="width:55px;text-align: center"><span class="ui-column-title">'+'Moyenne'+'</span></th>';

  if(document.getElementById((name)+'foot') != null){
    document.getElementById((name)+'foot').remove();    
  }
  document.getElementById("marksForm:marksWidget:coursesTable_foot").innerHTML+= '<tr role="row" id="'+name+'foot"><th></th><th class="ui-state-default" role="columnheader"><span class="ui-column-title">Moyenne Semestre</span></th><th class="ui-state-default" role="columnheader" style="width:100px;"><span class="ui-column-title">'+(isNaN(Math.round((moyS / totC)*100)/100)?"N.C":Math.round((moyS / totC)*100)/100)+'</span></th><th></th><th class="ui-state-default" role="columnheader" style="width:37px;text-align: center"><span class="ui-column-title">Tot. ECTS</span></th><th class="ui-state-default" role="columnheader" style="width:55px;text-align: center"><span class="ui-column-title">'+totE+'</span></th></tr>';
}

generateAverage();