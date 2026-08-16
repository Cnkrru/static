(function () {
  var groupsEl = document.getElementById('groups');

  function createFileEl(file) {
    var a = document.createElement('a');
    a.href = file.path;
    a.setAttribute('download', '');

    var row = document.createElement('span');
    row.className = 'row';
    if (file.tag) {
      var tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = file.tag;
      row.appendChild(tag);
    }
    var name = document.createElement('span');
    name.className = 'name';
    name.textContent = file.name;
    row.appendChild(name);
    a.appendChild(row);

    if (file.size) {
      var meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = file.size;
      a.appendChild(meta);
    }
    return a;
  }

  function render(data) {
    if (data.title) {
      document.getElementById('title').textContent = data.title;
      document.title = data.title + ' · Cnkrru';
    }
    if (data.subtitle) {
      document.getElementById('subtitle').textContent = data.subtitle;
    }
    (data.groups || []).forEach(function (group) {
      var section = document.createElement('section');
      var h2 = document.createElement('h2');
      h2.textContent = group.name;
      section.appendChild(h2);

      var ul = document.createElement('ul');
      (group.files || []).forEach(function (file) {
        var li = document.createElement('li');
        li.appendChild(createFileEl(file));
        ul.appendChild(li);
      });
      section.appendChild(ul);
      groupsEl.appendChild(section);
    });
  }

  fetch('/assets/data/download.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(render)
    .catch(function () {
      var p = document.createElement('p');
      p.style.cssText = 'color: var(--muted); font-size: 14px; padding: 12px 2px;';
      p.textContent = '无法加载资源清单 download.json';
      groupsEl.appendChild(p);
    });
})();