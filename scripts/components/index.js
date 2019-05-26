'use strict';

let index = {};

state.lastScrollPosition = 0;
state.wrapperNr = 0;
state.sheet = 1;
state.mouseIsUp = false;
state.foldUnfold = {
  fullContents: [],
  briefContents: [],
  isFull: []
};
state.moveBlocked = false;
state.wrapperNr = 0;


if (typeof visualViewport === 'undefined') {
  var visualViewport = {
    width: window.innerWidth - 15,
    height: window.innerHeight - 15,
  };
}

let viewPort = {
  width: () => {
    return ((typeof visualViewport === 'undefined') ? (window.innerWidth - 15) : window.visualViewport.width);
  },
  height: () => {
    return ((typeof visualViewport === 'undefined') ? (window.innerHeight - 15) : window.visualViewport.height);
  }
};


const delay = 500;
let instances = 0,
  movePromise = null,
  $menu = document.getElementById('menu'),
  $imgWrapper, $mainMenuButton, $backgroundWrapper, $imgShadow, $login, $titlesContainer, $titlesContainer2, $categories, $header, $arrowUp, $contacts = document.getElementById('contacts'),
  post, $sizedependent, $wrappersAr = [],
  clickEvent = new Event('click'),
  lastX, lastY,
  $arrowDown, $wrappers;



window.runIndex = window.onload || (() => {});

window.onload = () => {

  // if (
  //   window.location.protocol === 'http:'
  // ) {
  //   window.location.href = window.location.href.replace('http:', 'https:');
  // }


  functions.setServiceWorker();



  state.viewPort = {
    width: viewPort.width(),
    height: viewPort.height()
  };

  const $blog = document.getElementById('blog-href'),
    $editProfileTip = document.querySelector('#edit-profile-tip'),
    $editProfile = document.querySelector('#header > div.greetings > div > a'),
    $arrow = document.getElementById('arrow-wrapper');
  $mainMenuButton = document.getElementById('main-menu-button');
  $sizedependent = document.querySelectorAll('.sizedependent');


  $header = document.getElementById('header'),
    $imgWrapper = document.querySelector('.img-wrapper'),
    $arrowUp = document.querySelector('.arrow-up'),
    $arrowDown = document.querySelector('.arrow-down'),
    $imgShadow = document.getElementById('img-shadow'),
    $wrappers = document.getElementById('wrappers')
  $backgroundWrapper = document.getElementById('background-wrapper');



  $wrappersAr = [document.getElementById('wrapper-0'), document.getElementById('wrapper-1'),
    document.getElementById('wrapper-2'), document.getElementById('wrapper-3')
  ];

  index.loadWrappers(() => {
    index.moveViewportToWrapper(state.wrapper);
  });
  functions.resizeImages($sizedependent);

  for (let i = 0, max = $sizedependent.length; i < max; i++) {
    $sizedependent[i].removeAttribute('width');
    $sizedependent[i].removeAttribute('height');
    $sizedependent[i].style.width = '';
  }

  if (viewPort.width() > 700) {
    functions.menuObj.showMenu($menu);
    $menu.style.display = '';
  }

  if (viewPort.width() <= 700) {
    $menu.style.display = 'none';
    functions.menuObj.hideMenu($menu);

  }

  lastX = window.pageXOffset;
  lastY = window.pageYOffset;
  let intervalParalax = null;

  /**event handlers **/

  window.addEventListener('resize', function () {

    let vh = window.innerHeight * 10; //0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);


    if (state.viewPort.width <= 700 && viewPort.width() + 15 > 700) {

      functions.resizeImages(document.querySelectorAll('.sizedependent'));
    }
    state.viewPort.width = viewPort.width();
  });

  window.addEventListener('scroll', () => {
    // return;
    if (viewPort.width() > 700) {

      index.handleScroll();

    } else {
      index.handleScrollSmall();
    }
  }, false);

  document.getElementById('arrow-wrapper').addEventListener('touchstart', () => {}, {
    passive: true
  });



  $arrowDown.addEventListener('touchstart', () => {}, {
    passive: true
  });



  $arrowUp.addEventListener('touchstart', () => {}, {
    passive: true
  });

  /* events move to viewports */
  $arrow.addEventListener('click', /*viewPort.width() > 700 ?*/ () => {
    index.moveViewportToWrapper(1);
  } /* : () => {}*/ , false);
  //
  $arrowUp.addEventListener('click', () => {

    if (state.wrapperNr === 3 && viewPort.width() > 700) {
      index.moveViewportToWrapper(0);
      return;
    }

    index.moveViewportToWrapper(state.wrapperNr - 1);


  }, false);

  try {
    $editProfile.addEventListener('mouseover', () => {
      $editProfileTip.classList.remove('hidden');
    }, false);


    $editProfile.addEventListener('mouseout', () => {

      $editProfileTip.classList.add('hidden');
    }, false);

  } catch (e) {

  }

  $arrowDown.addEventListener('click', /*window.viewPort.width() > 700 ?*/ () => {

    if (state.wrapperNr === 1) {
      index.moveViewportToWrapper(2);
      return;
    }

    if (state.wrapperNr === 2) {
      index.moveViewportToWrapper(3); //, null, 2);
    }

    if (state.wrapperNr === 3) {
      if (viewPort.width() > 700) {
        index.moveViewportToWrapper(2);
        return;
      }
      index.moveViewportToWrapper(1);
    }

  } /*: () => {}*/ , false);


  document.addEventListener('mouseup', () => {
    state.mouseIsUp = false;
  }, true);

  window.addEventListener('resize', () => {


    if (window.innerWidth > 700) {
      functions.menuObj.showMenu($menu);
    } else {

      functions.menuObj.hideMenu($menu);
      $wrappersAr[1].classList.remove('inactive');
      $sizedependent = document.querySelectorAll('.sizedependent');

    }
  }, false);

  /* Event for open menu */
  $mainMenuButton.addEventListener('click', (e) => {
    // debugger;
    if (config.mainMenu.opened) {
      index.closeMenu();

    } else {

      $mainMenuButton.classList.add('active');
      $menu.classList.remove('hidden');

      if ($imgWrapper !== null) {
        $imgWrapper.classList.add('inactive');
      }

      if ($backgroundWrapper !== null) {
        $backgroundWrapper.classList.add('inactive');
      }

      if ($wrappersAr[1]) {
        $wrappersAr[1].classList.add('inactive');
      }
      config.mainMenu.opened = true;
    }

    e.preventDefault();

  }, false);



  /* *********** */
  /*  functions  */
  /* *********** */

  /* change viewport */
  index.moveViewportToWrapper = (nr, beh, byScrolling) => {

    if (state.moveBlocked) return;
    let oldWrapperNr = state.wrapperNr;
    window.document.body.style.overflowY = 'hidden';

    state.moveBlocked = true;
    let behavior = beh || 'smooth';

    $arrowUp.removeAttribute('up');
    $mainMenuButton.style.right = '';



    window.document.body.style.overflowY = '';

    document.querySelector('#wrapper-' + nr).scrollIntoView({
      behavior: behavior
    });

    setTimeout(() => {

      document.querySelector('#wrapper-' + nr).scrollIntoView({
        behavior: behavior
      });

      if (viewPort.width() < 700) {
        index.closeMenu();
      }

      index.rearangeAfterMove(nr, byScrolling);

    }, 500);


    

    state.wrapperNr = nr;

    intervalParalax = setInterval(index.paralax, 30);

    if (state.wrapperNr === 1) {
      clearInterval(intervalParalax);
    }

    setTimeout(() => {
      state.moveBlocked = false;
      index.paralax();
    }, 3000);

  };

  $contacts.addEventListener('click', (e) => {
    e.preventDefault();
    index.moveViewportToWrapper(3);
  }, false);

  $blog.addEventListener('click', (e) => {
    index.moveViewportToWrapper(1);

    e.preventDefault();
  }, false);
};


function checkWrapper() {


  if (window.pageXOffset <= 3 / 4 * window.innerWidth && window.pageYOffset === 0) {

    try {
      index.moveViewportToWrapper(0);
    } catch (e) {

    }

  }


  if (window.pageXOffset <= 3 / 4 * window.innerWidth) {


    if ((2 / 3 * window.pageYOffset < window.innerHeight && state.wrapperNr === 1) || window.pageYOffset === 0) {
      //  index.moveViewportToWrapper(0);

    }
  }

  //  requestAnimationFrame(checkWrapper);
}

requestAnimationFrame(() => {
  checkWrapper(new Date());
});



index.scrollWrappersPositions =

  index.handleScroll = () => {
    if (state.moveBlocked) return; //stop if is already moving

    let inner_Width = window.innerWidth;
    let inner_Height = window.innerHeight;

    (() => {
      /* block under 1 */
      // if (window.pageXOffset <= 2 / 3 * inner_Width) {
      //   if (window.pageYOffset > 1 / 3 * inner_Height) {
      //     window.scrollTo(lastX, inner_Height);
      //     index.moveViewportToWrapper(1);
      //   }
      // }

      console.log(state.wrapperNr);

      if (window.pageYOffset > lastY) {
        /* 0->1 */

        if (window.pageXOffset <= 1.5 / 3 * inner_Width) {
          if (window.pageYOffset > 2 / 3 * inner_Height && state.wrapperNr === 0) {
            //state.moveBlocked = true;
            index.moveViewportToWrapper(1);
          }
        }

        /* 3->2 */
        if (window.pageXOffset > 2 / 3 * inner_Width && state.wrapperNr === 3) {
          if (window.pageYOffset > 2 / 3 * inner_Height) {
            index.moveViewportToWrapper(2);
          }
        }
      }

      if (window.pageYOffset < lastY) {

        if (window.pageXOffset <= 3 / 4 * inner_Width && window.pageYOffset === 0) {
          index.moveViewportToWrapper(0);
        }

        /* 1->0 */
        if (window.pageXOffset <= 3 / 4 * inner_Width) {


          if ((2 / 3 * window.pageYOffset < inner_Height && state.wrapperNr === 1) || window.pageYOffset === 0) {
            index.moveViewportToWrapper(0);

          }
        }

        /* 2->3 */
        if (window.pageXOffset >= 3 / 4 * inner_Width) {
          if (3 * window.pageYOffset < 2 * inner_Height) {
            index.moveViewportToWrapper(3);
            setTimeout(() => {
              $wrappersAr[3].scrollIntoView({
                behavior: 'smooth'
              });
            }, delay);
          }
        }
      }

      if (window.pageXOffset > lastX) {
        /* 1->2 */
        if (window.pageXOffset > 2 / 3 * inner_Width) {
          if (window.pageYOffset >= 2 * inner_Height / 3 && state.wrapperNr === 1) {
            $arrowDown.dispatchEvent(clickEvent);
            index.moveViewportToWrapper(2);
            setTimeout(() => {
              $wrappersAr[2].scrollIntoView({
                behavior: 'smooth'
              });
            }, delay);
          }
        }
      }

      if (window.pageXOffset < lastX) {
        if (window.pageXOffset < 2 / 3 * inner_Width) {
          if (window.pageYOffset < 2 / 3 * inner_Width) {
            index.moveViewportToWrapper(0);
            setTimeout(() => {
              $wrappersAr[0].scrollIntoView({
                behavior: 'smooth'
              });
            }, delay);
          }
        }
      }
    })();

    /*  paralax scrolling */

    (() => {

      if (viewPort.height() > window.pageYOffset + 200) {
        $imgWrapper.children[0].style.top = -2 * window.pageYOffset + 'px';
        $imgShadow.style.top = -5 * window.pageYOffset + 'px';
      }
    })();

    lastX = window.pageXOffset;
    lastY = window.pageYOffset;
  };

index.handleScrollSmall = () => {

  if (state.moveBlocked) {
    return;
  } //stop if is already moving
  const dl = 0;
  if (lastY < window.pageYOffset) {

    if (viewPort.height() * 2 / 3 < window.pageYOffset && state.wrapperNr === 0) {

      setTimeout(() => {
        index.moveViewportToWrapper(1);
      }, dl);
    }

    if (viewPort.height() * 4 / 3 < window.pageYOffset && state.wrapperNr === 1) {

      setTimeout(() => {
        index.moveViewportToWrapper(2);
      }, dl);
    }

    if (viewPort.height() * 7 / 3 < window.pageYOffset && state.wrapperNr === 2) {

      setTimeout(() => {
        index.moveViewportToWrapper(3);
      }, dl);
    }
  }

  if (lastY > window.pageYOffset) {
    /** 1->0 */
    if (viewPort.height() > window.pageYOffset * 2 / 3 && state.wrapperNr === 1) {

      setTimeout(() => {
        index.moveViewportToWrapper(0);
      }, dl);
    }

    /** 2->1 */
    console.log(viewPort.height());
    if (viewPort.height() > window.pageYOffset * 5 / 3 && state.wrapperNr === 2) {
      console.log('2->1');
      setTimeout(() => {
        index.moveViewportToWrapper(1);
      }, dl);

    }


  }

  (() => {
    /**paralax */

    if (viewPort.height() + 100 > window.pageYOffset + 200) {
      $imgWrapper.children[0].style.top = -2 * window.pageYOffset + 'px';
      $imgShadow.style.top = -5 * window.pageYOffset + 'px';
      lastY = window.pageYOffset;
    }
  })();
};

index.rearangeAfterMove = (nr, byScrolling) => {


  if(navigator.userAgent.match('Chrome') && viewPort.width()>700 && nr===2){
    window.scrollBy(60,0);
  }


  $header.parentNode.removeChild($header);

  $wrappersAr[nr].insertBefore($header, $wrappersAr[nr].firstChild);
  if (nr !== 2 && document.querySelector('.pre-left') !== null && !byScrolling) {

    document.querySelector('.pre-left').classList.add('left');
    document.querySelector('.left').classList.remove('pre-left');

  }

  switch (nr) {

    case 0:
      document.body.classList = [];
      document.body.classList.add('nr0');

      if (typeof ($categories === 'undefined')) {
        break;
      }
      $categories.classList.remove('loaded');
      break;

    case 1:
      document.body.classList = [];
      document.body.classList.add('nr1');
      $header.style.transform = '';

      if ($arrowUp.getAttribute('down') !== null) {
        $arrowUp.removeAttribute('down');
      }
      if (typeof $categories !== 'undefined') {
        $categories.classList.add('loaded');
      }
      break;

    case 2:
      document.body.classList = [];
      document.body.classList.add('down');
      document.body.classList.add('nr2');
      $menu.style.transform = '';
      $menu.style.top = '';

      try {
        document.querySelector('.left').classList.add('pre-left');
        document.querySelector('.left').classList.remove('left');
      } catch (e) {

      }
      break;

    case 3:

      document.body.classList = [];
      document.body.classList.add('nr3');
      $menu.style.top = '';
      $header.style.transform = '';
      $arrowUp.setAttribute('up', 'true');
  }

};

index.loadWrappers = (callback) => {
  index.fetchOneWrapper(1, () => {
    index.fetchOneWrapper(2, () => {
      index.fetchOneWrapper(3, () => {
        $categories = document.getElementById('categories');
        $categories.addEventListener('click', (e) => {
          let $target = e.target;

          if ($target.classList.contains('title') || $target.classList.contains('title2')) {
            $target.parentNode.children[0].children[0].click();
          }
        }, false);

        functions.resizeImages([$wrappersAr[3].querySelector('#background-wrapper img')]);
        callback();
      });
    });
  });

};

index.fetchOneWrapper = (nr, callback) => {
  fetch(`components/index/wrapper-${nr}.php`).then((data) => {
    return data.text();
  }).then((data) => {
    $wrappersAr[nr].innerHTML = data;
    callback();
  });
};


index.closeMenu = () => {
  // debugger;
  $mainMenuButton.classList.remove('active');

  if ($imgWrapper !== null) {
    $imgWrapper.classList.remove('inactive');
  }

  if ($backgroundWrapper !== null) {
    $backgroundWrapper.classList.remove('inactive');
  }

  $menu.classList.add('hidden');

  if ($wrappersAr[1]) {
    $wrappersAr[1].classList.remove('inactive');
  }

  config.mainMenu.opened = false;

}

index.paralax = () => {
  $imgWrapper.children[0].style.top = -2 * window.pageYOffset + 'px';
  $imgShadow.style.top = -5 * window.pageYOffset + 'px';
};