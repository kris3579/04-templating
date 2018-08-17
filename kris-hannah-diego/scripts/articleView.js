'use strict';

let articleView = {};

// Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// Arrow functions affect what "this" refers to - they do not have their own context. There was no issue changing the articleView methods to arrow functions, as well as the $(document).ready, because none of these need their own "this". The inner functions need "this", so the arrow functions do not work.

articleView.populateFilters = () => {
  $(rawData).each(function() {
    let compiledTemplate = Handlebars.compile($('#author-filter-template').html());
    $('#author-filter').append(compiledTemplate(this));
  });
  $(rawData).each(function() {
    let compiledTemplate = Handlebars.compile($('#category-filter-template').html());
    $('#category-filter').append(compiledTemplate(this));
  });
};

articleView.handleAuthorFilter = () => {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-author="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = () => {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $(`article[data-category="${$(this).val()}"]`).fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = () => {
  $('nav').on('click', '.tab', function(e) {
    e.preventDefault();
    $('.tab-content').hide();
    $(`#${$(this).data('content')}`).fadeIn();
  });

  $('nav .tab:first').click();
};

articleView.setTeasers = () => {
  $('.article-body *:nth-of-type(n+2)').hide();
  $('article').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    if ($(this).text() === 'Read on →') {
      $(this).parent().find('*').fadeIn();
      $(this).html('Show Less &larr;');
    } else {
      $('body').animate({
        scrollTop: ($(this).parent().offset().top)
      },200);
      $(this).html('Read on &rarr;');
      $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
    }
  });
};

$(document).ready( () => {
  articleView.populateFilters();
  articleView.handleCategoryFilter();
  articleView.handleAuthorFilter();
  articleView.handleMainNav();
  articleView.setTeasers();
})
