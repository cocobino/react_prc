
window.onload = () => {
    
    const fileUploadObj = {
        init () {
            //event binding
            this.event();
        },
        event() {
            //ignore & style
            const dragOver = (e)=>{
                e.preventDefault();e.stopPropagation(); 
                e.dataTransfer.dropEffect="copy";
                
            }

            //fileUpload
            const uploadFile = (e)=>{
                e.preventDefault();
                e.stopPropagation();
                const files = e.dataTransfer.files;
                //validation
                if(files[0].type.indexOf('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') >= 0)return alert('엑셀파일을 올려주세요');
                    const excelReader = new FileReader();
                    excelReader.onload = (e) => {
                        const data = e.target.result; 
                        const workbook = XLSX.read(data, {type:'binary'}); 
                        workbook.SheetNames.forEach((item) => {
                            EXCEL_JSON = XLSX.utils.sheet_to_json(workbook.Sheets[item]);
                            EXCEL_JSON.length > 0 ? removeMask.style.display ='none' : removeMask.style.display ='block'; //remove popup
                            console.log(EXCEL_JSON)
                            monthGraph();
                            monthBestGraph();
                            utilityCost();
                            onlineCost();
                        });
                    };
                    excelReader.readAsBinaryString(files[0]);
            }

            const dragFileUpload = document.querySelector('#dragFileUpload');
            const removeMask = document.querySelector('#removeMask'); //remove popup
            dragFileUpload.addEventListener('dragover', dragOver);
            dragFileUpload.addEventListener('dragleave', dragOver);
            dragFileUpload.addEventListener('drop', uploadFile);
        }
    }

    fileUploadObj.init();
}

