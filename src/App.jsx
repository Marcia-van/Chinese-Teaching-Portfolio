import React, { useState, useEffect } from 'react';
import {
  User,
  BookOpen,
  Briefcase,
  Globe,
  MessageSquare,
  Plane,
  Clock,
  BarChart3,
  ChevronDown,
  RotateCw,
  Coffee,
  Factory,
  CheckCircle2,
  Utensils,
  XCircle,
  Trees
} from 'lucide-react';

const App = () => {
  // --- 场景互动状态管理 ---

  // 场景 1 互动状态：填空练习
  const [slotWords, setSlotWords] = useState(['____', '____']);
  const [usedWords, setUsedWords] = useState([]);

  // 场景 2 互动状态：连连看
  const [selectedPair, setSelectedPair] = useState({ en: null, zh: null });
  const [matchedPairs, setMatchedPairs] = useState([]);

  // 场景 3 互动状态：翻转卡片
  const [flippedCards, setFlippedCards] = useState({});

  // 场景 4 互动状态：汉字演变 (木林森)
  const [forestLevel, setForestLevel] = useState(1);

  // --- 处理逻辑 ---

  // 场景 1 处理逻辑
  const handleSlotClick = (word) => {
    if (usedWords.includes(word)) return;
    const newSlots = [...slotWords];
    const emptyIndex = newSlots.findIndex(s => s === '____');
    if (emptyIndex !== -1) {
      newSlots[emptyIndex] = word;
      setSlotWords(newSlots);
      setUsedWords([...usedWords, word]);
    }
  };

  // 场景 2 处理逻辑
  const handleMatch = (type, value) => {
    const newPair = { ...selectedPair, [type]: value };
    setSelectedPair(newPair);

    if (newPair.en && newPair.zh) {
      const pairs = {
        'Welcome': '欢迎',
        'Itinerary': '行程',
        'Headquarters': '总部'
      };
      if (pairs[newPair.en] === newPair.zh) {
        setMatchedPairs([...matchedPairs, newPair.en]);
      }
      setTimeout(() => setSelectedPair({ en: null, zh: null }), 500);
    }
  };

  // 场景 3 处理逻辑
  const toggleCard = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 辅助组件 - 颜色已更新
  const SectionTitle = ({ children }) => (
    <h2 className="text-4xl font-bold text-[#4A70A9] mb-12 text-center">
      {children}
      <div className="h-1.5 w-24 bg-[#8FABD4] mx-auto mt-4 rounded-full"></div>
    </h2>
  );

  return (
    <div className="font-sans text-slate-900 bg-[#EFECE3] scroll-smooth min-h-screen">
      {/* 导航栏 */}
      <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50 py-4 px-8 flex justify-between items-center">
        <div className="text-[#4A70A9] font-bold text-2xl tracking-tight">JING ZHANG</div>
        <div className="hidden md:flex gap-8">
          {['Home', 'Academic-Expertise',  'Interactive Training', 'Analytics'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-lg font-medium text-slate-600 hover:text-[#4A70A9] transition-colors">
              {item}
            </a>
          ))}
        </div>
      </nav>

{/* 第一页：首页（合并版） */}
<section id="home" className="min-h-screen flex flex-col items-center justify-center p-8 pt-32 max-w-7xl mx-auto">
  <div className="flex flex-col md:flex-row items-center gap-16">

{/* 左侧：形象照 */}
<div className="md:w-1/2 flex justify-center">
  <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl transform -rotate-2">
    <img
      src="/assets/me1.png"
      alt="Jing Zhang"
      className="w-full h-full object-cover"
      onError={(e) => {
        // 如果还是看不到，说明文件名或位置有误，会显示占位图
        e.target.src = "https://via.placeholder.com/450x450?text=Check+Image+Path";
      }}
    />
  </div>
</div>

    {/* 右侧：核心介绍 + 背景卡片 */}
    <div className="md:w-1/2 text-center md:text-left space-y-8">
      <div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-[#4A70A9] leading-tight mb-4">Jing Zhang</h1>
        <p className="text-2xl md:text-3xl text-[#8FABD4] font-medium italic mb-6">
          Chinese Language Architect for Global Professionals
        </p>
        <p className="text-xl text-slate-600 leading-relaxed max-w-xl">
          Empowering executives with high-impact communication. Practical. Sophisticated.
        </p>
      </div>

      {/* 整合进去的背景部分：采用 Grid 布局 */}
      <div className="grid grid-cols-1 gap-4 mt-8">
        {[
          { label: "Germany - FAU", desc: "M.A. Decision-Making Across Cultures" },
          { label: "Academic", desc: "M.A. Linguistics & Applied Linguistics" },
          { label: "Experience", desc: "4+ Years Cross-Border Business Ops" }
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white shadow-sm">
            <div className="bg-[#8FABD4] p-2 rounded-lg text-white">
              <BookOpen size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-black text-[#8FABD4]">{item.label}</p>
              <p className="text-sm font-bold text-[#4A70A9]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
</section>

      {/* 教学方法论 Section */}
      <section id="methodology" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <SectionTitle>Pedagogical Rigor & Real-world Application</SectionTitle>
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
            <div className="p-8 text-white flex items-center justify-between bg-[#8FABD4]">
              <div className="flex items-center gap-4">
                <CheckCircle2 size={32} />
                <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">SVEB Training Standards</h3>
                  <p className="text-blue-50 text-sm italic">Ensuring Professional Outcomes for Adult Learners</p>
                </div>
              </div>
              <div className="hidden md:block bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/30 text-xs font-bold uppercase tracking-widest">
                Framework 2026
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-6 font-black text-[#4A70A9] uppercase text-sm tracking-wider">SVEB Core Focus</th>
                    <th className="p-6 font-black text-[#4A70A9] uppercase text-sm tracking-wider">Our Curriculum Response</th>
                    <th className="p-6 font-black text-[#4A70A9] uppercase text-sm tracking-wider font-strike">Common Industry Gap</th>
                    <th className="p-6 font-black text-[#4A70A9] uppercase text-sm tracking-wider">Refinement Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { core: "Needs Analysis (需求分析)", resp: "Pre-course workplace audit (出差/项目型分层)", gap: "Generic syllabus (统一教材推进)", strat: "Job-specific profiles (定制课程路径)" },
                    { core: "Task-Based Learning (任务导向)", resp: "Simulated business interactions (商务任务目标)", gap: "Textbook drilling (泛泛提升口语)", strat: "Scenario performance (可观察任务目标)" },
                    { core: "Evidence of Progress (反馈与评估)", resp: "Video analysis (发音/语用/任务反馈)", gap: "Subjective assessment (笼统鼓励)", strat: "Recorded reviews (阶段反馈模板)" },
                    { core: "Agile Adaptation (反思与改进)", resp: "Review every 4 weeks (真实职场迁移)", gap: "Fixed, rigid planning (教案固定不变)", strat: "Real-time loops (4周滚动修订)" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition-all group">
                      <td className="p-6">
                        <p className="font-bold text-slate-800">{row.core.split(' ')[0]}</p>
                        <p className="text-xs text-slate-400 font-medium">{row.core.split(' ')[1]}</p>
                      </td>
                      <td className="p-6">
                        <div className="flex items-start gap-2">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8FABD4]" />
                          <span className="text-[#4A70A9] font-bold text-lg leading-tight">{row.resp}</span>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="text-slate-400 line-through decoration-red-300 decoration-2 italic text-sm">{row.gap}</span>
                      </td>
                      <td className="p-6">
                        <span className="inline-block bg-[#EFECE3] text-[#4A70A9] text-xs font-black px-4 py-2 rounded-xl border border-[#8FABD4] uppercase tracking-tighter group-hover:bg-[#8FABD4] group-hover:text-white transition-colors">
                          {row.strat}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 flex items-center gap-2 italic">
                <MessageSquare size={16} />
                Note: All modules are designed according to the SVEB (Federation for Adult Learning) framework for professional competency.
              </p>
            </div>
          </div>
        </div>
      </section>

{/* 第三页：学术深度转化（Diagnosis, Architecture, Assessment） */}
<section id="academic-expertise" className="py-32 px-8">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-[#4A70A9] mb-12 text-center">
      Academic Insight for Executive Precision
      <div className="h-1.5 w-24 bg-[#8FABD4] mx-auto mt-4 rounded-full"></div>
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {/* 核心理念 1: Precise Diagnosis */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:bg-[#4A70A9] transition-all duration-500">
        <div className="bg-[#EFECE3] p-6 rounded-full mb-6 group-hover:bg-white/20 transition-colors">
          {/* 使用你已有 import 的 Globe 图标 */}
          <Globe size={40} className="text-[#4A70A9] group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#4A70A9] group-hover:text-white mb-4">Precise Diagnosis</h3>
        <p className="text-slate-600 group-hover:text-blue-50 leading-relaxed font-medium">
          Using <strong>Applied Linguistics</strong> methodology to deconstruct deep-seated barriers in pronunciation and grammar logic—moving beyond generic advice.
        </p>
      </div>

      {/* 核心理念 2: Architectural Design */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:bg-[#4A70A9] transition-all duration-500">
        <div className="bg-[#EFECE3] p-6 rounded-full mb-6 group-hover:bg-white/20 transition-colors">
          {/* 使用你已有 import 的 BookOpen 图标 */}
          <BookOpen size={40} className="text-[#4A70A9] group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#4A70A9] group-hover:text-white mb-4">Architectural Design</h3>
        <p className="text-slate-600 group-hover:text-blue-50 leading-relaxed font-medium">
          Based on <strong>Cross-Cultural Decision-Making (FAU)</strong> theory, I design a "Language Decision System" tailored to your professional role and ROI.
        </p>
      </div>

      {/* 核心理念 3: Impact Assessment */}
      <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:bg-[#4A70A9] transition-all duration-500">
        <div className="bg-[#EFECE3] p-6 rounded-full mb-6 group-hover:bg-white/20 transition-colors">
          {/* 使用你已有 import 的 BarChart3 图标 */}
          <BarChart3 size={40} className="text-[#4A70A9] group-hover:text-white" />
        </div>
        <h3 className="text-2xl font-bold text-[#4A70A9] group-hover:text-white mb-4">Impact Assessment</h3>
        <p className="text-slate-600 group-hover:text-blue-50 leading-relaxed font-medium">
          Drawing from the <strong>SVEB Adult Education</strong> framework to make your Chinese communication progress observable, quantifiable, and traceable.
        </p>
      </div>
    </div>

    {/* 底部金句卡片 */}
    <div className="mt-20 p-13 bg-[#4A70A9] rounded-[3rem] text-center text-white shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
        <Globe size={160} />
      </div>
      <p className="text-2xl md:text-1xl font-light italic leading-relaxed relative z-10 max-w-4xl mx-auto">
        "My background in Linguistics isn't about teaching theory—it's about the <span className="font-bold text-[#8FABD4]">Scientific Precision</span> used to diagnose your challenges and assess your ROI."
      </p>
    </div>
  </div>
</section>

      {/* 第四页：核心场景互动 */}
      <section id="interactive-training" className="py-32 px-8">
        <div className="max-w-5xl mx-auto space-y-24">
          <SectionTitle>Interactive Business Scenarios</SectionTitle>

          {/* 互动 1：填空练习 */}
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-[#4A70A9] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Factory size={28} />
                <h3 className="text-2xl font-bold">Zoom Meeting: Opening Remarks</h3>
              </div>
              <span className="bg-[#8FABD4] px-4 py-1 rounded-full text-sm">Interactive Quiz</span>
            </div>
            <div className="p-10 space-y-8">
              <p className="text-xl text-slate-700">Practice how to start a meeting with a factory manager:</p>
              <div className="flex flex-wrap items-center gap-4 text-3xl font-medium text-[#4A70A9] bg-slate-50 p-8 rounded-2xl border-2 border-dashed border-slate-200">
                <span>王经理，</span>
                <span className={`px-4 py-1 rounded border-b-4 border-[#8FABD4] min-w-[100px] text-center ${slotWords[0] === '____' ? 'text-slate-300' : 'text-[#4A70A9]'}`}>
                  {slotWords[0]}
                </span>
                <span>！我们来</span>
                <span className={`px-4 py-1 rounded border-b-4 border-[#8FABD4] min-w-[100px] text-center ${slotWords[1] === '____' ? 'text-slate-300' : 'text-[#4A70A9]'}`}>
                  {slotWords[1]}
                </span>
                <span>一下生产进度。</span>
              </div>
              <div className="flex gap-4 justify-center">
                {['您好', '确认', '谢谢', '出发'].map((word) => (
                  <button
                    key={word}
                    disabled={usedWords.includes(word)}
                    onClick={() => handleSlotClick(word)}
                    className={`px-8 py-3 rounded-xl text-xl font-bold transition-all ${usedWords.includes(word) ? 'bg-slate-200 text-slate-400' : 'bg-[#EFECE3] text-[#4A70A9] hover:bg-[#8FABD4] hover:text-white shadow-md'}`}
                  >
                    {word}
                  </button>
                ))}
                <button onClick={() => {setSlotWords(['____', '____']); setUsedWords([]);}} className="p-3 text-slate-400 hover:text-[#4A70A9]"><RotateCw /></button>
              </div>
            </div>
          </div>

          {/* 互动 2：连连看 */}
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-[#4A70A9] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User size={28} />
                <h3 className="text-2xl font-bold">Reception: Matching Game</h3>
              </div>
              <span className="bg-[#8FABD4] px-4 py-1 rounded-full text-sm">Vocabulary Match</span>
            </div>
            <div className="p-10 grid md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <p className="font-bold text-slate-500 mb-4">ENGLISH TERM</p>
                {['Welcome', 'Itinerary', 'Headquarters'].map(en => (
                  <button
                    key={en}
                    onClick={() => handleMatch('en', en)}
                    className={`w-full p-5 rounded-2xl text-xl font-semibold border-2 transition-all ${matchedPairs.includes(en) ? 'bg-green-100 border-green-500 text-green-700' : selectedPair.en === en ? 'border-[#4A70A9] bg-blue-50' : 'border-slate-100 bg-slate-50'}`}
                  >
                    {en} {matchedPairs.includes(en) && '✓'}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <p className="font-bold text-slate-500 mb-4">CHINESE TRANSLATION</p>
                {['行程', '总部', '欢迎'].map(zh => (
                  <button
                    key={zh}
                    onClick={() => handleMatch('zh', zh)}
                    className={`w-full p-5 rounded-2xl text-xl font-semibold border-2 transition-all ${matchedPairs.some(p => {
                      const m = {'Welcome':'欢迎','Itinerary':'行程','Headquarters':'总部'};
                      return m[p] === zh;
                    }) ? 'bg-green-100 border-green-500 text-green-700' : selectedPair.zh === zh ? 'border-[#4A70A9] bg-blue-50' : 'border-slate-100 bg-slate-50'}`}
                  >
                    {zh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 互动 3：餐厅点餐翻转卡片 */}
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-[#4A70A9] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Utensils size={28} />
                <h3 className="text-2xl font-bold">Shanghai Dining: Dietary Restrictions</h3>
              </div>
              <span className="bg-[#8FABD4] px-4 py-1 rounded-full text-sm font-bold">Flash Cards</span>
            </div>
            <div className="p-10 space-y-8 text-center">
              <p className="text-xl text-slate-600 font-medium">Click to flip and learn how to express "No [Ingredient]" in Chinese:</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { id: 1, name: 'Coriander', en: 'No Cilantro', zh: '不要香菜', py: 'Bú yào xiāng cài', icon: '🌿' },
                  { id: 2, name: 'Onions', en: 'No Onions', zh: '不要洋葱', py: 'Bú yào yáng cōng', icon: '🧅' },
                  { id: 3, name: 'Peanuts', en: 'No Peanuts', py: 'Bú yào huā shēng', zh: '不要花生米', icon: '🥜' },
                  { id: 4, name: 'Vinegar', en: 'No Vinegar', py: 'Bú yào cù', zh: '不要醋', icon: '🍶' },
                  { id: 5, name: 'Spring Onion', en: 'No Scallions', py: 'Bú yào c葱', zh: '不要葱', icon: '🌱' }
                ].map((item) => (
                  <div key={item.id} onClick={() => toggleCard(item.id)} className="group perspective h-48 cursor-pointer">
                    <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${flippedCards[item.id] ? 'rotate-y-180' : ''}`}>
                      <div className="absolute inset-0 backface-hidden bg-slate-50 rounded-2xl border-2 border-slate-100 flex flex-col items-center justify-center p-4 shadow-sm group-hover:border-blue-300 transition-colors">
                        <span className="text-4xl mb-3">{item.icon}</span>
                        <p className="font-bold text-[#4A70A9]">{item.en}</p>
                      </div>
                      <div className="absolute inset-0 backface-hidden bg-[#4A70A9] rounded-2xl flex flex-col items-center justify-center p-4 text-white rotate-y-180 shadow-lg">
                        <p className="text-2xl font-bold mb-1">{item.zh}</p>
                        <p className="text-xs text-blue-200 italic">{item.py}</p>
                        <div className="mt-3 bg-white/20 p-1 rounded-full"><XCircle size={20} /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <style>{` .perspective { perspective: 1000px; } .transform-style-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); } `}</style>
            </div>
          </div>






          {/* 互动 5：汉字演变 (木 -> 林 -> 森) */}
          <div className="bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-[#4A70A9] p-6 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trees size={28} />
                <h3 className="text-2xl font-bold">Logic: Character Evolution</h3>
              </div>
              <span className="bg-[#8FABD4] px-4 py-1 rounded-full text-sm font-bold tracking-wider">Concept Demo</span>
            </div>
            <div className="p-10 space-y-12 text-center">
              <div className="h-64 flex items-center justify-center gap-12 bg-slate-50 rounded-3xl border border-slate-100 shadow-inner">
                {forestLevel >= 1 && <div className="flex flex-col items-center animate-bounce"><span className="text-8xl font-serif text-[#4A70A9]">木</span></div>}
                {forestLevel >= 2 && <div className="flex flex-col items-center animate-bounce" style={{ animationDelay: '0.2s' }}><span className="text-8xl font-serif text-[#4A70A9]">林</span></div>}
                {forestLevel >= 3 && <div className="flex flex-col items-center animate-bounce" style={{ animationDelay: '0.4s' }}><span className="text-8xl font-serif text-green-700">森</span></div>}
              </div>
              <div className="flex gap-6 justify-center">
                {[1, 2, 3].map(level => (
                  <button key={level} onClick={() => setForestLevel(level)} className={`w-16 h-16 rounded-2xl text-2xl font-black transition-all ${forestLevel === level ? 'bg-[#4A70A9] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {level}
                  </button>
                ))}
              </div>
              <div className="bg-[#f0ede4] p-8 rounded-2xl border border-slate-200 text-left">
                <p className="text-xl text-slate-700 font-medium leading-relaxed">
                  {forestLevel === 1 && "One tree makes Wood (木). It is the base element."}
                  {forestLevel === 2 && "Two trees side by side make a Grove (林). Doubling the character adds quantity."}
                  {forestLevel === 3 && "Three trees grouped together create a dense Forest (森)."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

{/* 第五页：Interaction Analytics Demo (完整功能演示版) */}
      <section id="analytics" className="py-32 px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          {/* 左侧卡片：数据可视化演示 */}
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-4xl font-bold text-[#4A70A9] mb-2">Interaction Summary</h2>
                <p className="text-slate-500 font-medium">Visualizing executive learning impact and engagement metrics.</p>
              </div>
              <span className="bg-[#8FABD4]/20 text-[#4A70A9] px-3 py-1 rounded-md text-xs font-black uppercase tracking-widest border border-[#8FABD4]/30">
                Sample Report
              </span>
            </div>

            <div className="h-1.5 w-24 bg-[#8FABD4] mb-12 rounded-full"></div>

            <div className="space-y-10">
              {/* 参与度进度条 */}
              <div>
                <div className="flex justify-between mb-3 text-lg font-bold text-[#4A70A9]">
                  <span>Executive Active Participation</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">
                  <div className="bg-[#8FABD4] h-full w-[92%] rounded-full shadow-lg"></div>
                </div>
                <p className="mt-2 text-xs text-slate-400 italic font-medium">
                  Note: Based on participation in business role-plays and decision-making tasks.
                </p>
              </div>

              {/* 语音输出比例展示 */}
              <div className="flex items-center justify-around bg-[#EFECE3]/40 p-8 rounded-3xl border border-slate-100">
                <div className="text-center">
                  <p className="text-4xl font-black text-[#4A70A9]">65%</p>
                  <p className="text-slate-500 font-bold uppercase text-xs mt-2 tracking-widest">Executive Talk Time</p>
                </div>
                <div className="w-px h-16 bg-slate-200"></div>
                <div className="text-center">
                  <p className="text-4xl font-black text-[#8FABD4]">35%</p>
                  <p className="text-slate-500 font-bold uppercase text-xs mt-2 tracking-widest">Expert Guidance</p>
                </div>
              </div>

              {/* 今日掌握要点清单 */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-slate-800">Key Competencies Mastered Today:</h4>
                <div className="flex flex-wrap gap-2">
                  {['Logistics Terms', 'Greeting Etiquette', 'Tone Correction'].map(t => (
                    <span key={t} className="bg-green-50 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold border border-green-100">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 右侧卡片：专业反馈与策略 */}
          <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 flex flex-col">
            <h3 className="text-2xl font-bold text-[#4A70A9] mb-8 flex items-center gap-3">
              <MessageSquare size={24} className="text-[#8FABD4]" /> Professional Feedback Demo
            </h3>

            <div className="flex-1 space-y-6">
              {/* 观察记录 */}
              <div className="p-6 bg-[#EFECE3]/50 rounded-2xl border-l-8 border-[#8FABD4]">
                <p className="font-bold text-[#4A70A9] mb-1 italic">Performance Observation:</p>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  The executive demonstrated high confidence in factory floor simulations. Focus on refining industry-specific jargon in the next phase.
                </p>
              </div>

              {/* 定制策略 */}
              <div className="p-6 bg-blue-50/50 rounded-2xl border-l-8 border-[#4A70A9]">
                <p className="font-bold text-[#4A70A9] mb-1 italic">Strategic Pivot for Next Session:</p>
                <p className="text-lg text-slate-700 leading-relaxed font-medium">
                  Prioritizing "Contract Negotiation" and "Managing Quality Escalations" to align with Q3 factory audits.
                </p>
              </div>

              {/* 输入框区域 */}
              <div className="mt-auto">
                <label className="block text-sm font-black text-slate-400 mb-3 uppercase tracking-widest">
                  New Strategic Requirements
                </label>
                <textarea
                  className="w-full p-5 bg-slate-50 rounded-2xl border-2 border-slate-100 focus:border-[#4A70A9] focus:bg-white outline-none transition-all text-lg"
                  rows="4"
                  placeholder="Input specific organizational goals or individual feedback here..."
                ></textarea>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 页脚 */}
      <footer className="py-12 bg-white text-center border-t border-slate-100">
        <p className="text-slate-400 font-medium">© 2024 Jing Zhang | Professional Chinese Education</p>
      </footer>
    </div>
  );
};

export default App;