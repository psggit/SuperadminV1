
// Validate the value entered with the constraints of the type
/*  Possible Types
    'pan_number' : Number of length 10,
*/
const validation = (value, type) => {
  const p1 = new Promise( (resolve, reject) => {
    if (type === 'pan_number') {
      const alphaNumeric = /^[0-9a-zA-Z]+$/;
      if ((value.length === 10) && (value.match(alphaNumeric))) {
        resolve();
      } else {
        alert('Pan Number Invalid: Please Enter an alphanumberic string of length 10.');
        reject();
      }
    } else if (type === 'pin_code') {
      const numbers = /\d+/;
      if ((value.length === 6) && (value.match(numbers))) {
        resolve();
      } else {
        alert('Pin Number Invalid: Please Enter a 6 digit number.');
        reject();
      }
    } else if (type === 'non_empty_text') {
      if (value.length > 0) {
        resolve();
      } else {
        alert('Field Empty: Please Enter atleast 1 character.');
        reject();
      }
    } else if (type === 'number') {
      if (value === parseInt(value, 10)) {
        resolve();
      } else {
        alert('Field Empty: Please Enter atleast 1 character.');
        reject();
      }
    } else if (type === 'gps') {
      // TODO : Change to Regex
      const gps = /^(-?\d{1,2}\.\d{3,15}),(-?\d{1,2}\.\d{3,15})$/;
      if (value.match(gps)) {
        resolve();
      } else {
        alert('GPS format invlaid: Expected Format : Comma separated string containing coordiantes upto 6 decimal places');
        reject();
      }
    } else {
      reject();
    }
  });
  return p1;
};

export {
  validation
};
