(function () {
  if (!window.asoConfigurationId) return;

  // Hide configurator immediately to avoid flash
  var initStyle = document.createElement('style');
  initStyle.id = 'aso-simple-init-style';
  initStyle.textContent =
    '.shopify-app-wrapper,.aso-modal-buttons-container{display:none!important}';
  document.head.appendChild(initStyle);

  function restoreConfigurator() {
    var s = document.getElementById('aso-simple-init-style');
    if (s) s.remove();
  }

  fetch(
    (window.Shopify && window.Shopify.routes && window.Shopify.routes.root
      ? window.Shopify.routes.root
      : '/') +
      'apps/aso-proxy/api/configurations/' +
      window.asoConfigurationId
  )
    .then(function (r) {
      return r.json();
    })
    .then(function (config) {
      var simpleOptions =
        config &&
        config.data &&
        config.data.settings &&
        config.data.settings.generals &&
        config.data.settings.generals.simpleOptions;

      if (
        simpleOptions &&
        simpleOptions.enabled &&
        simpleOptions.optionGroups &&
        simpleOptions.optionGroups.length > 0
      ) {
        window.asoSimpleMode = true;
        asoRenderSimpleOptions(simpleOptions.optionGroups);
      } else {
        restoreConfigurator();
      }
    })
    .catch(restoreConfigurator);

  function asoRenderSimpleOptions(groups) {
    var container = document.getElementById('aso-simple-options-container');
    if (!container) return;

    var html = '<div class="aso-simple-options-wrapper">';
    groups.forEach(function (group) {
      var selectId = 'aso-select-' + group.id;
      var errorId = 'aso-error-' + group.id;
      html += '<div class="aso-simple-option-group">';
      html +=
        '<label class="aso-simple-option-label" for="' +
        selectId +
        '">' +
        esc(group.name) +
        '</label>';
      html +=
        '<select class="aso-simple-option-select" id="' +
        selectId +
        '" data-group-id="' +
        group.id +
        '" data-group-name="' +
        esc(group.name) +
        '" data-required="' +
        (group.required ? 'true' : 'false') +
        '">';
      html +=
        '<option value="">\u2014 Select ' + esc(group.name) + ' \u2014</option>';
      group.options.forEach(function (opt) {
        html +=
          '<option value="' +
          esc(opt.value) +
          '">' +
          esc(opt.label) +
          '</option>';
      });
      html += '</select>';
      html +=
        '<span class="aso-simple-option-error" id="' +
        errorId +
        '">Please select a ' +
        esc(group.name) +
        '.</span>';
      html += '</div>';
    });
    html += '</div>';

    container.innerHTML = html;
    container.style.display = 'block';

    // Inject hidden property inputs into the product form
    var productForm = document.querySelector('form[action*="/cart/add"]');
    if (!productForm) return;

    groups.forEach(function (group) {
      if (!productForm.querySelector('input[name="properties[' + group.name + ']"]')) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'properties[' + group.name + ']';
        input.id = 'aso-prop-' + group.id;
        input.value = '';
        productForm.appendChild(input);
      }
    });

    // Sync selects → hidden inputs
    container.addEventListener('change', function (e) {
      var select = e.target && e.target.closest('[data-group-name]');
      if (!select) return;
      var propName = select.getAttribute('data-group-name');
      var errorEl = document.getElementById(
        'aso-error-' + select.getAttribute('data-group-id')
      );
      var hiddenInput = productForm.querySelector(
        'input[name="properties[' + propName + ']"]'
      );
      if (hiddenInput) hiddenInput.value = select.value;
      if (errorEl) errorEl.classList.remove('visible');
    });

    // Validate before submit
    productForm.addEventListener(
      'submit',
      function (e) {
        var hasError = false;
        groups.forEach(function (group) {
          if (!group.required) return;
          var select = document.getElementById('aso-select-' + group.id);
          var errorEl = document.getElementById('aso-error-' + group.id);
          if (select && !select.value) {
            hasError = true;
            if (errorEl) errorEl.classList.add('visible');
          }
        });
        if (hasError) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      },
      true
    );
  }

  function esc(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
