  var viewmodel;

  var model = {
    Pages: [{
      Id: 1,
      Title: 'Design',
      Color: '#000',
      HeaderText: 'Design',
      MainText: "doesn't need to be static"
    }, {
      Id: 2,
      Title: 'Code',
      Color: '#2c3e50',
      HeaderText: 'Think',
      MainText: 'design beyond the surface, design between the lines.'
    }, {
      Id: 3,
      Title: 'Media',
      Color: '#000',
      HeaderText: '',
      MainText: ''
    }, {
      Id: 4,
      Title: 'Contact',
      Color: '#fff',
      HeaderText: '',
      MainText: ''
    }, {
      Id: 5,
      Title: '',
      Color: '#B00',
      HeaderText: '',
      MainText: ''
    }]
  };

  var options = {
    extend: {
      "{root}.Pages[i]": function (page) {
        page.attMenuanchor = ko.pureComputed(function () {
          return 'page' + page.Id();
        });
        page.attHref = ko.pureComputed(function () {
          return '#page' + page.Id();
        });
        page.attId = ko.pureComputed(function () {
          return 'section' + page.Id();
        });
        page.HeaderText = page.HeaderText || "";
        page.MainText = page.MainText || "";
      },
      "{root}": function (root) {

        root.CurrentPageId = ko.observable(1),

          root.getAnchors = function () {
            var anchors = new Array(root.Pages().length);
            for (var i = 0; i < root.Pages().length; i++) {
              anchors[i] = root.Pages()[i].attMenuanchor();
            }
            return anchors;
          },
          root.getSectionsColors = function () {
            var colors = new Array(root.Pages().length);
            for (var i = 0; i < root.Pages().length; i++) {
              colors[i] = root.Pages()[i].Color();
            }
            return colors;
          },
          root.getTitles = function () {
            var titles = new Array(root.Pages().length);
            for (var i = 0; i < root.Pages().length; i++) {
              titles[i] = root.Pages()[i].Title();
            }
            return titles;
          }
      }
    }
  };





  $(document).ready(function () {
    // 1. apply bindings
    viewmodel = ko.viewmodel.fromModel(model, options);
    ko.applyBindings(viewmodel);
    console.log(viewmodel);


    var anchors = viewmodel.getAnchors();
    var colors = viewmodel.getSectionsColors();
    var titles = viewmodel.getTitles();
    // 2. init pagepiling
    $('#pagepiling').pagepiling({
      menu: '#menu',
      anchors: anchors,
      sectionsColor: colors,
      navigation: {
        'position': 'right',
        'tooltips': titles
      },

      // called once on page load
      afterRender: function () {
        console.log("afterRender");
      },
      // called directly when scroll
      onLeave: function (index, nextIndex, direction) {
        console.log("onLeave: (index: " + index + ", nextIndex: " + nextIndex + ", direction: " + direction + ")");
        viewmodel.CurrentPageId(nextIndex);
      },
      afterLoad: function (anchorLink, index) {
        console.log("afterLoad: (anchorLink: " + anchorLink + ", index: " + index + ")");

      }
    });
  });
