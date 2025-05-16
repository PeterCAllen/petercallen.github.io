---
layout: null
sitemap:
  exclude: 'yes'
---
function toggleMobileMenu() {
  $('.navigation-wrapper').toggleClass('visible');
  $('.btn-mobile-menu__icon').toggleClass('hidden');
  $('.btn-mobile-close__icon').toggleClass('hidden');
}

// Keep track of what section is visible
let currentSection = "projects"; // Default section

$(document).ready(function () {
  // General panel button logic (home, about, etc.)
  $('a.panel-button').click(function (e) {
    const target = $(this).attr('href');
    // Only handle project/publication buttons separately below
    if (target === "#projects" || target === "#publications") return; 

    if ($('.content-wrapper').hasClass('showing')){
      $('.content-wrapper').removeClass('animated slideInRight')
      $('.panel-cover').removeClass('panel-cover--collapsed')
      $('.panel-cover').css('max-width', '100%')
      $('.panel-cover').animate({'width': '100%'}, 400, swing = 'swing', function () {})
      $('.content-wrapper').removeClass('showing')
      history.pushState("", document.title, window.location.pathname + window.location.search);
      e.preventDefault();
      return;
    }
    $('.panel-cover').addClass('panel-cover--collapsed');
    currentWidth = $('.panel-cover').width()
    if (currentWidth < 960) {
      $('.panel-cover').addClass('panel-cover--collapsed')
      $('.content-wrapper').addClass('animated slideInRight')
    } else {
      $('.panel-cover').css('max-width', currentWidth)
      $('.panel-cover').animate({'max-width': '530px', 'width': '40%'}, 400, swing = 'swing', function () {})
    }
    $('.content-wrapper').addClass('showing');
  });

  // Toggle between Projects and Publications
  $('.projects-button').click(function(e){
    e.preventDefault();
    if (!$('.content-wrapper').hasClass('showing')) {
      // Panel is closed, open it and show projects
      $('.panel-cover').addClass('panel-cover--collapsed');
      $('.content-wrapper').addClass('showing');
    }
    $('#projects-section').show();
    $('#publications-section').hide();
    currentSection = "projects";
    $('html, body').animate({
      scrollTop: $("#projects-section").offset().top
    }, 500);
  });

  $('.publications-button').click(function(e){
    e.preventDefault();
    if (!$('.content-wrapper').hasClass('showing')) {
      // Panel is closed, open it and show publications
      $('.panel-cover').addClass('panel-cover--collapsed');
      $('.content-wrapper').addClass('showing');
    }
    $('#projects-section').hide();
    $('#publications-section').show();
    currentSection = "publications";
    $('html, body').animate({
      scrollTop: $("#publications-section").offset().top
    }, 500);
  });

  // Optional: When clicking panel background, close everything
  if (window.location.hash && window.location.hash == '#projects') {
    $('a.panel-button.projects-button').click();
  }
  if (window.location.hash && window.location.hash == '#publications') {
    $('a.panel-button.publications-button').click();
  }

  if (window.location.pathname !== '{{ site.baseurl }}/' && window.location.pathname !== '{{ site.baseurl }}/index.html') {
    $('.panel-cover').addClass('panel-cover--collapsed')
  }

  $('.btn-mobile-menu').click(function () {
    if (!$('.navigation-wrapper').hasClass('animated bounceInDown')){
        $('.navigation-wrapper').addClass('animated bounceInDown');
    }
    toggleMobileMenu();
  });

  $('.navigation-wrapper .projects-button, .navigation-wrapper .publications-button').click(function () {
    toggleMobileMenu();
  });
});
