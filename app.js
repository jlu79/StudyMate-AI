function nav(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (el) el.classList.add('active');
  updateWorkflow(id);
  closeSidebar();
}

function getInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return '?';
}

function getFirstName(name) {
  return name.trim().split(/\s+/)[0] || name;
}

function applyUserProfile(name, studentId) {
  document.getElementById('user-greeting-name').textContent = getFirstName(name);
  document.getElementById('user-display-name').textContent = name.trim();
  document.getElementById('user-student-id').textContent = studentId.trim();
  document.getElementById('user-avatar-initials').textContent = getInitials(name);
}

function showCanvasStep() {
  document.getElementById('login-step-canvas').classList.remove('hidden');
  document.getElementById('login-step-form').classList.add('hidden');
}

function showLoginForm() {
  document.getElementById('login-step-canvas').classList.add('hidden');
  document.getElementById('login-step-form').classList.remove('hidden');
  document.getElementById('login-name').focus();
}

function submitLogin(e) {
  e.preventDefault();
  const name = document.getElementById('login-name').value.trim();
  const studentId = document.getElementById('login-student-id').value.trim();
  if (!name || !studentId) return;
  sessionStorage.setItem('studymate-user', JSON.stringify({ name, studentId }));
  applyUserProfile(name, studentId);
  document.getElementById('login-modal').classList.add('hidden');
}

function clearUserProfile() {
  document.getElementById('user-greeting-name').textContent = 'Student';
  document.getElementById('user-display-name').textContent = 'Student';
  document.getElementById('user-student-id').textContent = '—';
  document.getElementById('user-avatar-initials').textContent = '?';
}

function initLogin() {
  const saved = sessionStorage.getItem('studymate-user');
  if (saved) {
    const { name, studentId } = JSON.parse(saved);
    applyUserProfile(name, studentId);
    document.getElementById('login-modal').classList.add('hidden');
  }
}

function logout() {
  sessionStorage.removeItem('studymate-user');
  clearUserProfile();
  document.getElementById('login-form').reset();
  showCanvasStep();
  document.getElementById('login-modal').classList.remove('hidden');
  closeSidebar();
  nav('dashboard', document.querySelector('[data-nav=dashboard]'));
}

initLogin();

function toggleSidebar() {
  const open = document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebar-overlay').classList.toggle('open', open);
  document.body.classList.toggle('sidebar-open', open);
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('open');
  document.body.classList.remove('sidebar-open');
}

function updateWorkflow(currentId) {
  const order = ['dashboard', 'upload', 'summary', 'plan', 'integrity', 'feedback'];
  const idx = order.indexOf(currentId);
  document.querySelectorAll('.workflow-step').forEach((step, i) => {
    step.classList.remove('done', 'current');
    if (i < idx) step.classList.add('done');
    if (i === idx) step.classList.add('current');
  });
}

function toggle(el) {
  el.classList.toggle('checked');
  el.textContent = el.classList.contains('checked') ? '✓' : '';
  const nameEl = el.parentElement.querySelector('.task-name');
  nameEl.classList.toggle('done');
  const done = document.querySelectorAll('.checkbox.checked').length;
  const total = document.querySelectorAll('.checkbox').length;
  document.getElementById('done-count').textContent = done + '/' + total;
}

function mockUpload() {
  const zone = document.getElementById('upload-zone');
  const nameEl = document.getElementById('upload-filename');
  zone.classList.add('has-file');
  nameEl.textContent = 'COSC2960_Assignment3_Brief.pdf';
  nameEl.style.display = 'block';
  document.getElementById('analyse-btn').disabled = false;
}

function analyseBrief() {
  const title = document.getElementById('brief-title').value || 'Assignment 3 — AI Study Planner Prototype';
  document.getElementById('summary-title').textContent = title;
  nav('summary', document.querySelector('[data-nav="summary"]'));
}

function goToPlan() {
  nav('plan', document.querySelector('[data-nav="plan"]'));
}

function goToIntegrity() {
  nav('integrity', document.querySelector('[data-nav="integrity"]'));
}

function goToFeedback() {
  const checked = document.getElementById('integrity-agree').checked;
  if (!checked) {
    showToast('Please confirm you understand the academic integrity guidelines.');
    return;
  }
  nav('feedback', document.querySelector('[data-nav="feedback"]'));
}

function setRating(n) {
  document.querySelectorAll('.star-rating span').forEach((star, i) => {
    star.classList.toggle('active', i < n);
    star.textContent = i < n ? '★' : '☆';
  });
  document.getElementById('rating-val').value = n;
}

function saveFeedback() {
  showToast('Thank you! Your feedback has been saved (prototype — no server).');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

function applyPlanEdit() {
  const h = parseInt(document.getElementById('edit-hours').value) || 3;
  document.getElementById('plan-hours-label').textContent = h + 'h/day';
  showToast('Study plan updated to ' + h + ' hours per day (mock).');
}
