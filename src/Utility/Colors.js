export default {

    yellow_theme : "#E9BB42",
    black:"#000000",
    blue_btn:"#42AFF2",
    black_btn:"#141414",
    forget_password_text:"#ED3B46",
    
}


// export default {
//     status_bar_color: "#6698FF",
//     color_primary:'#3B62FF',
//     color_secondary:'#FFFFFF',
  
  
//   };

export const formatDateTime = (date_time) =>  {

    let split_date = date_time.split(" ");

    let  date  = new Date(split_date[0]);
    
    let time = split_date[1].substring(0, split_date[1].lastIndexOf(":") + 1);

    let removed_last_semicolon  = time.substring(0, time.length - 1);

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year + ", " + removed_last_semicolon;
  }

