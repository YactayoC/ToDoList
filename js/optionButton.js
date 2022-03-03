const options = document.querySelectorAll('.main__options-b');

options.forEach((option, i) => {
    option.addEventListener('click', () => {
        options.forEach(option => {
            option.classList.remove('option--active');
        });

        option.classList.add('option--active');

        let dataFilter = option.getAttribute('data-filter');
        const checks = document.querySelectorAll('.checkbox__option');
        checks.forEach(check => {
            check.parentNode.parentNode.classList.remove('d-none');

            if (dataFilter === 'all') {
                check.parentNode.parentNode.classList.remove('d-none');
            }

            if (dataFilter === 'active') {
                if (check.checked === true) {
                    check.parentNode.parentNode.classList.add('d-none')
                }
            }

            if (dataFilter === 'completed') {
                if (check.checked === false) {
                    check.parentNode.parentNode.classList.add('d-none')
                }
            }
        })

    });
})
