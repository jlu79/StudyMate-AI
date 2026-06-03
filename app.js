function nav(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  if (el) el.classList.add('active');
  updateWorkflow(id);
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
