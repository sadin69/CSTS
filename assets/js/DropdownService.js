class DropdownService {
    selected;
    option;

    constructor(content, option, selected = null) {
        this.fillDropdown(content, option);
        this.initDropdown(option, selected);
        this.selected = selected;
        this.option   = option;
    }

    dependendChange() {
        $(document).on('change','.dropdown--'+ this.option, function(){
            $(this).addClass('exception');
            $('.dropdown--select-course-to-compare > option[value="' + this.value + '"]:not(.exception *)').remove();
            $(this).removeClass('exception');
        });
    }

     initDropdown(option, selected) {
        if (selected) {
            $('.dropdown--'+ option).val(selected);
        }
        $('.dropdown--'+ option).on('click', function(){ 
            this.selected =  $('.dropdown--'+ option).val();
        })
    }

    fillDropdown(content, option) {
        $.each(content, function (index, item) {
            $('.dropdown--'+ option).append(
                $('<option value="'+item+'"></option>').val(item).html(item)
            );
        })
    }

    getSelected() {
        return this.selected;
    }

    setSelected() {
        this.selected =  $('.dropdown--'+ this.option).val();
    }
}