export const validateName = (dataThis,elementError) => {
    var regex = /^[A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừửữựỲỴÝỶỸýỳỷỹỵ\s]{5,}$/;
    if (regex.test($(dataThis).val())) {
        $(dataThis).css('border', '1px solid green');
        elementError.text('');
        return true;  
    } else {
        $(dataThis).css('border', '1px solid red');
        elementError.text('* Name is invalid ');
        return false; 
    }
}
export const validatePrice = (dataThis,elementError) => {
    var regex = /^[0-9]+$/;
    if(regex.test($(dataThis).val())) {
        var num = parseInt($(dataThis).val());
        if(num >= 2000 && num <= 5000000) {
            $(dataThis).css('border', '1px solid green');
            elementError.text('');
            return true;
        }
    }
    $(dataThis).css('border', '1px solid red');
    elementError.text('* Price is invalid ');
    return false;
}
export const validateContent = (dataThis,elementError) => {
    let regex = /^.{10,}$/;

    if (regex.test($(dataThis).val())) {
        $(dataThis).css('border', '1px solid green');
        elementError.text('');
        return true;
    } else {
        $(dataThis).css('border', '1px solid red');
        elementError.text('* Content is invalid ');
        return false
    }
}