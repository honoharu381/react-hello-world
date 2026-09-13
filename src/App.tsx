import { useState } from 'react'
import './App.css'

type Task = { id: number; title: string; detail: string; time: string; tag: string; color: string; done: boolean }

const initialTasks: Task[] = [
  { id: 1, title: 'Morning pages', detail: 'A quiet start before the noise', time: '08:30', tag: 'Personal', color: 'peach', done: true },
  { id: 2, title: 'Design critique', detail: 'Review the new onboarding flow', time: '10:00', tag: 'Studio', color: 'mint', done: false },
  { id: 3, title: 'Lunch with Maya', detail: 'Kissa Dandelion, Ebisu', time: '12:30', tag: 'Social', color: 'lavender', done: false },
  { id: 4, title: 'Ship weekly note', detail: 'Three things worth remembering', time: '16:00', tag: 'Studio', color: 'butter', done: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [activeView, setActiveView] = useState('Today')
  const completed = tasks.filter((task) => task.done).length
  const toggleTask = (id: number) => setTasks((current) => current.map((task) => task.id === id ? { ...task, done: !task.done } : task))

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">m</span><span>Morrow</span></div>
        <div className="profile-card"><div className="avatar">AO</div><div><strong>Alex Ota</strong><span>Creative lead</span></div><button className="more-button" aria-label="Open profile menu">...</button></div>
        <nav className="nav-list" aria-label="Main navigation">
          {['Today', 'My week', 'Archive'].map((view) => <button key={view} className={activeView === view ? 'nav-item active' : 'nav-item'} onClick={() => setActiveView(view)}><span className="nav-icon">{view === 'Today' ? '○' : view === 'My week' ? '▦' : '↺'}</span>{view}{view === 'Today' && <span className="nav-count">{tasks.length}</span>}</button>)}
        </nav>
        <div className="sidebar-footer"><span className="status-dot"></span><span>All synced</span><span className="sync-time">just now</span></div>
      </aside>
      <section className="content">
        <header className="topbar"><span className="eyebrow">Monday, September 14, 2026</span><button className="icon-button" aria-label="Open notifications">◌<span className="notification-dot"></span></button></header>
        <div className="content-grid">
          <div className="main-column">
            <section className="welcome"><p className="kicker">A good day to make something</p><h1>Good morning,<br /><em>Alex.</em></h1><p className="intro">You have <strong>{tasks.length - completed} things</strong> on your list today. Keep the important bits close.</p></section>
            <div className="section-heading"><div><span className="section-label">Your rhythm</span><h2>{activeView}</h2></div><button className="add-button" onClick={() => setTasks((current) => [...current, { id: Date.now(), title: 'New focus', detail: 'A little space for what matters', time: '18:00', tag: 'Personal', color: 'peach', done: false }])}><span>+</span> Add focus</button></div>
            <div className="task-list">{tasks.map((task) => <article className={task.done ? 'task-card done' : 'task-card'} key={task.id}><button className="check-button" aria-label={task.done ? `Mark ${task.title} as incomplete` : `Complete ${task.title}`} onClick={() => toggleTask(task.id)}>{task.done ? '✓' : ''}</button><div className="task-copy"><div className="task-meta"><span className={`task-tag ${task.color}`}>{task.tag}</span><span>{task.time}</span></div><h3>{task.title}</h3><p>{task.detail}</p></div><button className="task-menu" aria-label={`Open ${task.title} menu`}>•••</button></article>)}</div>
          </div>
          <aside className="right-column">
            <section className="focus-card"><div className="focus-top"><span className="section-label">Daily intention</span><span className="sun">✳</span></div><p className="focus-quote">“Make room for the<br />unexpected good.”</p><div className="focus-line"></div><div className="focus-author"><div className="mini-avatar">M</div><span>Morning note<br /><small>Saved at 8:12</small></span></div></section>
            <section className="progress-card"><div className="progress-header"><span className="section-label">Today at a glance</span><strong>{completed}/{tasks.length}</strong></div><div className="progress-track"><span style={{ width: `${(completed / tasks.length) * 100}%` }}></span></div><p>{completed === tasks.length ? 'Everything is clear.' : `${tasks.length - completed} small steps left to make.`}</p></section>
            <div className="tip"><span className="tip-icon">i</span><p><strong>Small reminder</strong><br />Your best work needs some white space around it.</p></div>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default App
