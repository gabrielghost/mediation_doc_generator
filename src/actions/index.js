import axios from 'axios';
import xlsParse from '../utils/xlsParse';
import docxGen from '../utils/docxGen';

export const IMPORT_FILE = 'import_file';
const ROOT_URL = 'http://localhost:3000/api/assets/';

export function importFile(fileBinary){
  // const xlsData = new Promise((resolve, reject) => {
  //   let data = xlsParse(fileBinary);
  //   if (data == undefined){
  //     reject('xlsParse did not complete');
  //   } else {
  //     resolve(data);
  //   }
  // })
  const data = xlsParse(fileBinary);
  const docxTemplate = axios.get(`${ROOT_URL}MOU_input`);
  docxTemplate.then(function(res){
    let template = res.data;
    docxGen(data, template);
  }, function(err){
    console.log('template fetch failed');
  });

  return {
    type: IMPORT_FILE,
    payload: data
  }
}
