/* ===== add-course.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-add-course')) return;
    document.addEventListener('DOMContentLoaded', function () {

      const darkSwitch = document.getElementById('darkModeSwitch');
      darkSwitch.addEventListener('change', function () {
        document.documentElement.style.filter = this.checked ? 'invert(1) hue-rotate(180deg)' : 'none';
      });

      /* level pills */
      document.querySelectorAll('[data-level]').forEach(pill => {
        pill.addEventListener('click', function () {
          document.querySelectorAll('[data-level]').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
        });
      });

      /* thumbnail preview */
      const thumbUrl = document.getElementById('thumbUrl');
      const thumbPreview = document.getElementById('thumbPreview');
      thumbUrl.addEventListener('input', function () {
        thumbPreview.src = this.value;
      });

      /* tag input */
      const tagText = document.getElementById('tagText');
      const tagInput = document.getElementById('tagInput');
      tagText.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
          e.preventDefault();
          const chip = document.createElement('span');
          chip.className = 'tag-chip';
          chip.innerHTML = this.value.trim() + ' <i class="bi bi-x-lg" data-remove></i>';
          tagInput.insertBefore(chip, tagText);
          this.value = '';
        }
      });
      tagInput.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-remove')) {
          e.target.closest('.tag-chip').remove();
        }
      });

      /* submit -> toast, no real network call */
      const form = document.getElementById('addCourseForm');
      const toast = document.getElementById('toastSave');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        toast.style.display = 'flex';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
      });

    });
});


/* ===== admin-dashboard.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-admin-dashboard')) return;
    document.addEventListener('DOMContentLoaded', function () {

      /* ---- users table live search ---- */
      const userSearch = document.getElementById('userSearch');
      const rows = document.querySelectorAll('#usersTableBody tr');
      userSearch.addEventListener('keyup', function () {
        const value = this.value.trim().toLowerCase();
        rows.forEach(row => {
          row.style.display = row.innerText.toLowerCase().includes(value) ? '' : 'none';
        });
      });

      /* ---- dark mode toggle (simple invert-friendly theme) ---- */
      const darkSwitch = document.getElementById('darkModeSwitch');
      darkSwitch.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode', this.checked);
        document.documentElement.style.filter = this.checked ? 'invert(1) hue-rotate(180deg)' : 'none';
      });

      /* ---- revenue & enrollment trend chart ---- */
      const revenueCtx = document.getElementById('revenueChart');
      new Chart(revenueCtx, {
        type: 'line',
        data: {
          labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul'],
          datasets: [
            {
              label: 'Revenue',
              data: [6200, 7100, 8300, 7800, 9600, 11200, 12450],
              borderColor: '#6D28D9',
              backgroundColor: 'rgba(109,40,217,.08)',
              tension: .4,
              fill: true,
              pointRadius: 3,
              pointBackgroundColor:'#6D28D9'
            },
            {
              label: 'Enrollments',
              data: [420, 480, 560, 510, 640, 700, 760],
              borderColor: '#F5A524',
              backgroundColor: 'rgba(245,165,36,.08)',
              tension: .4,
              fill: true,
              yAxisID: 'y1',
              pointRadius: 3,
              pointBackgroundColor:'#F5A524'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: '#F1EDFA' }, ticks: { callback: v => '$' + v } },
            y1: { position: 'right', grid: { display: false }, ticks: { display: false } },
            x: { grid: { display: false } }
          }
        }
      });

      /* ---- category donut chart ---- */
      const categoryCtx = document.getElementById('categoryChart');
      new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
          labels: ['Development','AI & ML','Cloud','Security','Design'],
          datasets: [{
            data: [38, 26, 18, 12, 6],
            backgroundColor: ['#6D28D9','#F5A524','#2E90D9','#E4574C','#12A466'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          cutout: '68%',
          plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } }
        }
      });

    });
});


/* ===== browse-courses.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-browse-courses')) return;
  // Back To Top

  const topBtn=document.getElementById("topBtn");

  topBtn.onclick=function(){

  window.scrollTo({

  top:0,

  behavior:"smooth"

  });

  };

  // Search Courses

  const search=document.querySelector(".search-box input");

  search.addEventListener("keyup",function(){

  let value=this.value.toLowerCase();

  let cards=document.querySelectorAll(".course-card");

  cards.forEach(card=>{

  let title=card.querySelector("h5").innerText.toLowerCase();

  if(title.includes(value)){

  card.parentElement.style.display="block";

  }else{

  card.parentElement.style.display="none";

  }

  });

  });

  // Category Buttons

  const buttons=document.querySelectorAll(".category-btn");

  buttons.forEach(btn=>{

  btn.addEventListener("click",function(){

  buttons.forEach(b=>b.classList.remove("btn-primary","text-white"));

  this.classList.add("btn-primary","text-white");

  });

  });

  // Card Animation

  const courseCards=document.querySelectorAll(".course-card");

  courseCards.forEach(card=>{

  card.addEventListener("mouseenter",()=>{

  card.style.transform="translateY(-10px)";

  });

  card.addEventListener("mouseleave",()=>{

  card.style.transform="translateY(0)";

  });

  });
});


/* ===== certificate.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-certificate')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  });
});


/* ===== course-content.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-course-content')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  });
});


/* ===== course-details.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-course-details')) return;
  // Back to Top

  document.getElementById("topBtn").addEventListener("click",function(){

  window.scrollTo({

  top:0,

  behavior:"smooth"

  });

  });

  // Enroll Button

  document.querySelectorAll(".btn").forEach(button=>{

  if(button.innerText.includes("Enroll")){

  button.addEventListener("click",function(){

  alert("🎉 Congratulations!\n\nYou have successfully enrolled in this course.");

  });

  }

  });

  // Simple Scroll Animation

  const observer=new IntersectionObserver(entries=>{

  entries.forEach(entry=>{

  if(entry.isIntersecting){

  entry.target.style.opacity="1";

  entry.target.style.transform="translateY(0)";

  }

  });

  });

  document.querySelectorAll(".card,.accordion-item").forEach(el=>{

  el.style.opacity="0";

  el.style.transform="translateY(40px)";

  el.style.transition=".6s";

  observer.observe(el);

  });
});


/* ===== courses.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-courses')) return;
    document.addEventListener('DOMContentLoaded', function () {

      /* live search + filter across course cards */
      const searchInput = document.getElementById('courseSearch');
      const emptyState = document.getElementById('emptyState');
      const cards = document.querySelectorAll('.stat-card');

      searchInput.addEventListener('keyup', function () {
        const value = this.value.trim().toLowerCase();
        let found = value === '';

        cards.forEach(card => {
          const text = card.innerText.toLowerCase();
          const matches = value === '' || text.includes(value);
          card.closest('[class*="col-"]') ? (card.closest('[class*="col-"]').style.display = matches ? '' : 'none') : (card.style.display = matches ? '' : 'none');
          if (matches) found = true;
        });

        emptyState.classList.toggle('d-none', found);
      });

      /* back to top visibility + action */
      const topBtn = document.getElementById('topBtn');
      window.addEventListener('scroll', function () {
        topBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
      });
      topBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      /* welcome toast */
      const toast = document.getElementById('toast');
      setTimeout(() => {
        toast.style.display = 'flex';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
      }, 1000);

      /* smooth-scroll for in-page anchors */
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });

    });
});


/* ===== dashbord.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-dashbord')) return;
  // Animate cards


  let cards=document.querySelectorAll(".stat-card");


  cards.forEach(card=>{


  card.addEventListener("mouseenter",()=>{


  card.style.transform="translateY(-10px)";


  });


  card.addEventListener("mouseleave",()=>{


  card.style.transform="translateY(0)";


  });


  });
});


/* ===== edit-course.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-edit-course')) return;
    document.addEventListener('DOMContentLoaded', function () {

      const darkSwitch = document.getElementById('darkModeSwitch');
      darkSwitch.addEventListener('change', function () {
        document.documentElement.style.filter = this.checked ? 'invert(1) hue-rotate(180deg)' : 'none';
      });

      /* level pills */
      document.querySelectorAll('[data-level]').forEach(pill => {
        pill.addEventListener('click', function () {
          document.querySelectorAll('[data-level]').forEach(p => p.classList.remove('active'));
          this.classList.add('active');
        });
      });

      /* thumbnail preview */
      const thumbUrl = document.getElementById('thumbUrl');
      const thumbPreview = document.getElementById('thumbPreview');
      thumbUrl.addEventListener('input', function () {
        thumbPreview.src = this.value;
      });

      /* tag input */
      const tagText = document.getElementById('tagText');
      const tagInput = document.getElementById('tagInput');
      tagText.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && this.value.trim() !== '') {
          e.preventDefault();
          const chip = document.createElement('span');
          chip.className = 'tag-chip';
          chip.innerHTML = this.value.trim() + ' <i class="bi bi-x-lg" data-remove></i>';
          tagInput.insertBefore(chip, tagText);
          this.value = '';
        }
      });
      tagInput.addEventListener('click', function (e) {
        if (e.target.hasAttribute('data-remove')) {
          e.target.closest('.tag-chip').remove();
        }
      });

      /* submit -> toast, no real network call */
      const form = document.getElementById('editCourseForm');
      const toast = document.getElementById('toastSave');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        toast.style.display = 'flex';
        setTimeout(() => { toast.style.display = 'none'; }, 3000);
      });

      /* delete confirmation */
      document.getElementById('deleteCourseBtn').addEventListener('click', function () {
        if (confirm('Delete "Full Stack Web Development"? This cannot be undone.')) {
          toast.innerHTML = '<i class="bi bi-trash3-fill" style="color:var(--coral);"></i> Course deleted.';
          toast.style.display = 'flex';
          setTimeout(() => { toast.style.display = 'none'; }, 3000);
        }
      });

    });
});


/* ===== enrollment-success.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-enrollment-success')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  });
});


/* ===== forgot-password.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-forgot-password')) return;
  // Forgot Password Form
  document.getElementById("forgotForm").addEventListener("submit", function(e){

  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const successMsg = document.getElementById("successMsg");

  if(email === ""){

  alert("Please enter your registered email address.");

  return;

  }

  // Show success message
  successMsg.style.display = "block";

  // Disable button
  const btn = document.querySelector(".btn-reset");

  btn.disabled = true;
  btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Link Sent';

  // Redirect after 3 seconds
  setTimeout(function(){

  window.location.href="reset-password.html";

  },3000);

  });
});


/* ===== home1.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-home1')) return;
  const topBtn=document.getElementById("topBtn");

  window.onscroll=function(){

  if(document.documentElement.scrollTop>300){

  topBtn.style.display="block";

  }else{

  topBtn.style.display="none";

  }

  };

  topBtn.onclick=function(){

  window.scrollTo({

  top:0,

  behavior:"smooth"

  });

  };
});


/* ===== index.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-index')) return;
  // Back To Top

  const topBtn=document.getElementById("topBtn");

  window.addEventListener("scroll",function(){

  if(window.scrollY>300){

  topBtn.style.display="block";

  }else{

  topBtn.style.display="none";

  }

  });

  topBtn.onclick=function(){

  window.scrollTo({

  top:0,

  behavior:"smooth"

  });

  };

  // Card Hover Animation

  document.querySelectorAll(".card").forEach(card=>{

  card.addEventListener("mouseenter",()=>{

  card.style.transform="translateY(-8px)";

  card.style.transition=".3s";

  });

  card.addEventListener("mouseleave",()=>{

  card.style.transform="translateY(0px)";

  });

  });
});


/* ===== login.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-login')) return;
    document.addEventListener('DOMContentLoaded', function () {

      /* role toggle: student / admin */
      let currentRole = 'student';
      const roleButtons = document.querySelectorAll('.role-btn');
      const roleBadge = document.getElementById('roleBadge');
      const loginHeading = document.getElementById('loginHeading');
      const loginSub = document.getElementById('loginSub');
      const emailInputEl = document.getElementById('email');
      const loginBtnEl = document.getElementById('loginBtn');

      const roleConfig = {
        student: {
          badge: '<i class="bi bi-mortarboard-fill me-1"></i>Student Login',
          heading: 'Welcome back 👋',
          sub: 'Log in to continue your learning journey.',
          placeholder: 'you@example.com',
          btnLabel: 'Log In',
          redirect: 'my-courses.html'
        },
        admin: {
          badge: '<i class="bi bi-shield-lock-fill me-1"></i>Admin Login',
          heading: 'Welcome back, Admin',
          sub: 'Log in to manage courses, students and content.',
          placeholder: 'admin@novalearn.com',
          btnLabel: 'Log In as Admin',
          redirect: 'admin-dashboard.html'
        }
      };

      function applyRole (role) {
        currentRole = role;
        const cfg = roleConfig[role];
        roleButtons.forEach(function (btn) {
          const active = btn.dataset.role === role;
          btn.classList.toggle('active', active);
          btn.setAttribute('aria-selected', String(active));
        });
        roleBadge.innerHTML = cfg.badge;
        loginHeading.textContent = cfg.heading;
        loginSub.textContent = cfg.sub;
        emailInputEl.placeholder = cfg.placeholder;
        loginBtnEl.textContent = cfg.btnLabel;
      }

      roleButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          applyRole(this.dataset.role);
        });
      });

      /* show / hide password */
      const togglePassword = document.getElementById('togglePassword');
      const password = document.getElementById('password');
      togglePassword.addEventListener('click', function () {
        const isHidden = password.type === 'password';
        password.type = isHidden ? 'text' : 'password';
        this.classList.toggle('bi-eye-slash-fill', !isHidden);
        this.classList.toggle('bi-eye-fill', isHidden);
      });

      /* validation */
      const form = document.getElementById('loginForm');
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');
      const emailError = document.getElementById('emailError');
      const passwordError = document.getElementById('passwordError');
      const loginBtn = document.getElementById('loginBtn');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      function validateEmail () {
        const valid = emailPattern.test(emailInput.value.trim());
        emailInput.classList.toggle('is-invalid', !valid);
        emailError.style.display = valid ? 'none' : 'block';
        return valid;
      }

      function validatePassword () {
        const valid = passwordInput.value.trim().length >= 6;
        passwordInput.classList.toggle('is-invalid', !valid);
        passwordError.style.display = valid ? 'none' : 'block';
        return valid;
      }

      emailInput.addEventListener('blur', validateEmail);
      passwordInput.addEventListener('blur', validatePassword);

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailValid = validateEmail();
        const passwordValid = validatePassword();

        if (emailValid && passwordValid) {
          loginBtn.disabled = true;
          const loadingLabel = currentRole === 'admin' ? 'Logging in as Admin...' : 'Logging in...';
          loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>' + loadingLabel;
          setTimeout(() => {
            window.location.href = roleConfig[currentRole].redirect;
          }, 900);
        }
      });

    });
});


/* ===== materials.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-materials')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  });
});


/* ===== my-courses.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-my-courses')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  });
});


/* ===== notifications.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-notifications')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
    var markAllBtn = document.getElementById('markAllReadBtn');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', function () {
        document.querySelectorAll('.notif-item.unread').forEach(function (item) {
          item.classList.remove('unread');
        });
        document.querySelectorAll('.nav-badge').forEach(function (badge) {
          var link = badge.closest('.nav-link');
          if (link && link.classList.contains('active')) { badge.remove(); }
        });
        var pingEls = document.querySelectorAll('.icon-btn .ping');
        pingEls.forEach(function (p) { p.remove(); });
      });
    }
  });
});


/* ===== progress.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-progress')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('hoursChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Wk 1','Wk 2','Wk 3','Wk 4','Wk 5','Wk 6','Wk 7'],
          datasets: [{
            label: 'Hours',
            data: [9, 12, 7, 14, 11, 16, 12],
            backgroundColor: '#6D28D9',
            borderRadius: 8,
            maxBarThickness: 34
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { grid: { color: '#F1EDFA' }, ticks: { callback: function(v){ return v + 'h'; } } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  });
});


/* ===== register.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-register')) return;
  // Image Preview


  let photo=document.getElementById("photo");

  let preview=document.getElementById("preview");


  photo.onchange=function(){

  let reader=new FileReader();


  reader.onload=function(e){

  preview.src=e.target.result;

  preview.style.display="block";


  }


  reader.readAsDataURL(photo.files[0]);

  }



  // Show Hide Password


  let show=document.getElementById("showPassword");

  let password=document.getElementById("password");


  show.onclick=function(){


  if(password.type==="password"){


  password.type="text";


  show.classList.remove("bi-eye");


  show.classList.add("bi-eye-slash");


  }

  else{


  password.type="password";


  show.classList.remove("bi-eye-slash");


  show.classList.add("bi-eye");


  }


  }



  // Form Validation


  document.getElementById("registerForm")
  .addEventListener("submit",function(e){


  e.preventDefault();


  let pass=document.getElementById("password").value;


  let confirm=document.getElementById("confirmPassword").value;


  let error=document.getElementById("error");



  if(pass!==confirm){


  error.style.display="block";


  }

  else{


  error.style.display="none";


  alert("Registration Successful!");


  window.location.href="login.html";


  }



  });
});


/* ===== reset-password.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-reset-password')) return;
  // Show / Hide Password
  function togglePassword(id, element){

  let input = document.getElementById(id);
  let icon = element.querySelector("i");

  if(input.type === "password"){

  input.type = "text";
  icon.classList.remove("bi-eye-fill");
  icon.classList.add("bi-eye-slash-fill");

  }else{

  input.type = "password";
  icon.classList.remove("bi-eye-slash-fill");
  icon.classList.add("bi-eye-fill");

  }

  }

  // Password Strength
  const password = document.getElementById("password");
  const progress = document.querySelector(".progress");
  const strengthBar = document.getElementById("strengthBar");

  password.addEventListener("keyup",function(){

  progress.style.display="block";

  let value=password.value.length;

  if(value<6){

  strengthBar.style.width="25%";
  strengthBar.className="progress-bar bg-danger";

  }
  else if(value<10){

  strengthBar.style.width="60%";
  strengthBar.className="progress-bar bg-warning";

  }
  else{

  strengthBar.style.width="100%";
  strengthBar.className="progress-bar bg-success";

  }

  });

  // Reset Password
  document.getElementById("resetForm").addEventListener("submit",function(e){

  e.preventDefault();

  let pass=document.getElementById("password").value;
  let confirm=document.getElementById("confirmPassword").value;

  if(pass!==confirm){

  alert("Passwords do not match!");

  return;

  }

  document.getElementById("successMessage").style.display="block";

  const btn=document.querySelector(".btn-reset");

  btn.disabled=true;

  btn.innerHTML='<i class="bi bi-check-circle-fill"></i> Password Updated';

  setTimeout(function(){

  window.location.href="login.html";

  },2500);

  });
});


/* ===== video-player.html ===== */
document.addEventListener('DOMContentLoaded', function () {
  if (!document.body.classList.contains('page-video-player')) return;
  document.addEventListener('DOMContentLoaded', function () {
    var sidebar = document.getElementById('sidebar');
    var overlay = document.getElementById('overlay');
    var toggle = document.getElementById('menuToggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        var open = sidebar.classList.toggle('open');
        overlay.classList.toggle('show', open);
        toggle.setAttribute('aria-expanded', String(open));
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
    var search = document.getElementById('globalSearch');
    if (search) {
      search.addEventListener('keyup', function () {
        var q = this.value.trim().toLowerCase();
        document.querySelectorAll('[data-search]').forEach(function (el) {
          el.style.display = (q === '' || el.dataset.search.toLowerCase().indexOf(q) !== -1) ? '' : 'none';
        });
      });
    }
    document.querySelectorAll('.tab-pills').forEach(function (group) {
      group.querySelectorAll('.tab-pill').forEach(function (btn) {
        btn.addEventListener('click', function () {
          group.querySelectorAll('.tab-pill').forEach(function (b) { b.classList.remove('active'); });
          this.classList.add('active');
          var target = this.dataset.tabTarget;
          if (target) {
            document.querySelectorAll('[data-tab-panel]').forEach(function (p) {
              p.style.display = (p.dataset.tabPanel === target) ? '' : 'none';
            });
          }
        });
      });
    });
    document.querySelectorAll('.filter-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        this.parentElement.querySelectorAll('.filter-pill').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
      });
    });
  });
});
