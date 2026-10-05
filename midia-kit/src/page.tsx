"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import "./presentation.css";

const TOTAL = 10;

function Eye({ light = false, large = false }: { light?: boolean; large?: boolean }) {
  return <span className={`p-eye ${light ? "is-light" : ""} ${large ? "is-large" : ""}`}><img src="/reditus-eye.svg" alt="" /></span>;
}

function Brand({ light = false }: { light?: boolean }) {
  return <span className={`p-brand ${light ? "is-light" : ""}`}><Eye light={light}/><b>reditus</b></span>;
}

function Frame({ light = false }: { light?: boolean }) {
  return <>
    <span className="p-page-eye"><Eye light={light}/></span>
    <span className="p-page-note">presença · inteligência · retorno</span>
  </>;
}

function GeoMap() {
  return <div className="geo-map" aria-label="Comparação visual entre segmentação circular e por polígono">
    <div className="map-grid" />
    <svg viewBox="0 0 760 420" role="img" aria-label="Mapa estilizado com raio circular e polígono personalizado">
      <path className="map-road road-a" d="M-20 118 C160 78 248 172 408 132 S650 42 790 72" />
      <path className="map-road road-b" d="M110 -20 C130 120 250 190 210 450" />
      <path className="map-road road-c" d="M470 -20 C420 120 540 238 760 300" />
      <circle className="radius-zone" cx="205" cy="220" r="118" />
      <g className="radius-ripples"><circle cx="205" cy="220" r="118"/><circle cx="205" cy="220" r="118"/><circle cx="205" cy="220" r="118"/></g>
      <path className="polygon-zone" d="M430 105 L640 82 L698 190 L622 334 L446 314 L390 206 Z" />
      <circle className="polygon-marker" r="8"><animateMotion dur="4.8s" repeatCount="indefinite" path="M430 105 L640 82 L698 190 L622 334 L446 314 L390 206 Z"/></circle>
      <g className="map-pois">
        <circle cx="205" cy="220" r="10"/><circle cx="485" cy="144" r="8"/><circle cx="605" cy="128" r="8"/><circle cx="646" cy="246" r="8"/><circle cx="492" cy="274" r="8"/>
      </g>
    </svg>
    <div className="map-label radius-label"><small>RAIO CIRCULAR</small><b>inclui o entorno inteiro</b></div>
    <div className="map-label polygon-label"><small>POLÍGONO REDITUS</small><b>acompanha a área real</b></div>
    <span className="map-sim">simulação demonstrativa</span>
  </div>;
}

function RichLaptop() {
  return <div className="rich-stage" aria-label="Simulação animada de anúncio Rich Media expansível">
    <div className="laptop">
      <div className="laptop-screen">
        <div className="browser-bar"><i/><i/><i/><span>notícias / agora</span></div>
        <div className="article-lines"><b/><b/><b/><b/></div>
        <div className="refresh-ad">
          <small>REDITUS REFRESCA / FORMATO EXPANSÍVEL</small>
          <strong>reditus<br/>refresca.</strong>
          <span>o painel abre enquanto o vídeo continua</span>
          <svg viewBox="0 0 100 250" aria-hidden="true"><path d="M33 4h34c3 0 5 3 5 7v8c0 4-2 7-5 8l-2 1c1 21 7 35 15 52 9 18 9 39 4 58-4 17-7 34-4 56 3 23 8 42 0 54-9 13-25 16-45 16s-36-3-45-16c-8-12-3-31 0-54 3-22 0-39-4-56-5-19-5-40 4-58 8-17 14-31 15-52l-2-1c-3-1-5-4-5-8v-8c0-4 2-7 5-7Z"/></svg>
        </div>
        <div className="playing-video"><b>▶</b><small>vídeo em reprodução</small></div>
        <div className="motion-key"><span><b>1</b> vídeo encolhe</span><span><b>2</b> anúncio expande</span></div>
      </div>
      <div className="laptop-base" />
    </div>
  </div>;
}

function AudioPlayer() {
  return <div className="audio-stage" aria-label="Simulação animada de anúncio de áudio em streaming">
    <div className="headphone"><span/><span/></div>
    <div className="audio-player">
      <div className="player-top"><small>RÁDIO RED</small><i>•••</i></div>
      <div className="audio-cover cover-levis"><small>OFERECIMENTO</small><div className="levis-tab">reditus</div><em>som que veste<br/>sua campanha.</em></div>
      <p>Momento Reditus <span>00:18 / 00:30</span></p>
      <div className="audio-wave">{Array.from({length:12},(_,i)=><i key={i}/>)}</div>
      <div className="player-bottom"><b>‹‹</b><strong>▶</strong><b>››</b></div>
    </div>
  </div>;
}

const richFormats = [
  { id:"expand", number:"01", label:"Expansível", title:"reditus refresca", copy:"O conteúdo se reorganiza e abre espaço para uma peça maior, sem interromper a navegação." },
  { id:"scratch", number:"02", label:"Scratch", title:"revele a oferta", copy:"O usuário raspa a área criativa e descobre uma mensagem, benefício ou produto." },
  { id:"game", number:"03", label:"Gamificado", title:"jogue com a marca", copy:"Uma mecânica curta transforma atenção em interação e pode terminar em um CTA." },
  { id:"skin", number:"04", label:"Desktop Skin", title:"a marca ocupa o entorno", copy:"As laterais do site recebem a campanha enquanto o conteúdo permanece disponível no centro." },
  { id:"article", number:"05", label:"In-Article", title:"impacto dentro da leitura", copy:"A peça aparece entre os parágrafos e cria uma pausa visual integrada ao conteúdo." },
  { id:"pause", number:"06", label:"Pause Ads", title:"a pausa vira presença", copy:"Quando o conteúdo pausa, a campanha ocupa o player e fecha para o vídeo continuar." },
];

function RichMediaShowcase() {
  const [active,setActive]=useState(0);
  const item=richFormats[active];
  return <div className="rich-showcase" aria-label="Exemplos navegáveis de Rich Media">
    <div className={`rich-demo ${item.id}`}>
      {item.id==="expand"&&<RichLaptop/>}
      {item.id==="scratch"&&<div className="scratch-demo"><small>RASPÁVEL / SIMULAÇÃO</small><strong>raspe.<br/><em>revele.</em><br/>interaja.</strong><div className="scratch-card"><div className="scratch-result"><Eye/><b>mais atenção.</b><span>benefício desbloqueado</span></div><div className="scratch-layer"><span>raspe aqui</span>{Array.from({length:12},(_,i)=><i key={i} style={{"--y":`${24+i*4}%`,"--x":`${[10,16,12,18,9,15,11,17,10,14,18,12][i]}%`,"--w":`${[76,68,72,64,78,70,74,66,77,71,65,75][i]}%`,"--d":`${i*.09}s`,"--r":`${[-4,3,-2,4,-3,2][i%6]}deg`} as React.CSSProperties}/>)}</div><b className="scratch-cursor">r</b></div></div>}
      {item.id==="game"&&<div className="game-demo"><div className="reditris-hud"><div><small>REDITRIS™</small><span>blocos que constroem a marca</span></div><b>MISSÃO 02 / 03</b></div><strong>complete<br/>o <em>R.</em></strong><div className="reditris-board"><i className="tet t1"/><i className="tet t2"/><i className="tet t3"/><i className="tet t4"/><i className="tet t5"/><i className="tet t6"/><i className="tet falling"/><span className="reditris-eye"><Eye/></span></div><span>ENCAIXE PARA AVANÇAR ↓</span></div>}
      {item.id==="skin"&&<div className="skin-demo"><small>DESKTOP SKIN / SIMULAÇÃO</small><div className="skin-desktop"><div className="skin-top"><i/><i/><i/><span>portal / notícia</span></div><div className="skin-browser"><div className="skin-left">Reditus</div><div className="skin-page"><i/><i/><i/><strong>conteúdo do site</strong><span>notícia em destaque</span></div><div className="skin-right">Reditus</div></div><div className="skin-stand"/></div></div>}
      {item.id==="article"&&<div className="article-demo"><small>IN-ARTICLE / SIMULAÇÃO</small><div className="article-page"><i/><i/><i/><div className="article-unit"><span>REDITUS REFRESCA</span><strong>uma pausa<br/>que chama.</strong><Eye light/></div><i/><i/></div></div>}
      {item.id==="pause"&&<div className="pause-demo"><small>PAUSE ADS / SIMULAÇÃO</small><div className="pause-player"><div className="pause-video"><b>Ⅱ</b><span>conteúdo pausado</span></div><div className="rich-pause-ad"><i>R</i><strong>a pausa<br/><em>chama.</em></strong><span>continuar vídeo ×</span></div></div></div>}
    </div>
    <div className="rich-nav">
      <div className="rich-tabs">{richFormats.map((format,i)=><button key={format.id} className={active===i?'active':''} onClick={(event)=>{event.stopPropagation();setActive(i)}}><b>{format.number}</b><span>{format.label}</span></button>)}</div>
      <div className="rich-caption"><small>{item.label.toUpperCase()}</small><strong>{item.title}</strong><p>{item.copy}</p></div>
    </div>
  </div>;
}

function StrategySummary() {
  const phases=[
    ["01","precisão","Áreas reais e polígonos ajudam a reduzir dispersão."],
    ["02","contexto","A mídia aparece no ambiente e no momento relevantes."],
    ["03","impacto","Rich Media, áudio, streaming e DOOH ampliam as possibilidades."],
    ["04","clareza","O dashboard transforma entrega e resposta em decisão."],
  ];
  return <div className="strategy-mixer">
    <svg className="mixer-lines" viewBox="0 0 1000 430" preserveAspectRatio="none"><path d="M170 92 L500 215"/><path d="M830 92 L500 215"/><path d="M170 338 L500 215"/><path d="M830 338 L500 215"/></svg>
    <div className="mixer-core"><Eye/><small>ESTRATÉGIA</small><strong>combinação<br/>certa</strong></div>
    {phases.map((phase,i)=><section key={phase[0]} className={`mixer-node m${i+1}`}><b>{phase[0]}</b><strong>{phase[1]}</strong><p>{phase[2]}</p></section>)}
    <p className="mixer-note"><b>cada escolha alimenta a próxima.</b> Território, público, formato e mensuração trabalham como um único sistema.</p>
  </div>;
}

function WorkFlow() {
  const steps=[
    ["01","Briefing","Objetivo de negócio, público e momento da marca — o retorno esperado define o plano."],
    ["02","Plano de mídia","Frentes e formatos certos pro objetivo, com simulação de alcance e frequência."],
    ["03","Veiculação","Compra programática, criativos adaptados por contexto e otimização contínua."],
    ["04","Leitura","Dashboard em tempo real e relatório final com número e interpretação."],
  ];
  return <div className="workflow"><i className="workflow-line"/><i className="workflow-pulse"/>{steps.map((step,i)=><section key={step[0]} className={`workflow-step w${i+1}`}><b>PASSO {step[0]}</b><strong>{step[1]}</strong><p>{step[2]}</p></section>)}</div>;
}

function DoohCity() {
  return <div className="dooh-city" aria-label="Simulação animada de DOOH em ambiente urbano">
    <div className="city-line l1"/><div className="city-line l2"/><div className="city-line l3"/>
    <div className="building b1"/><div className="building b2"/><div className="building b3"/>
    <div className="billboard">
      <div className="billboard-face">
        <small>CHINELO</small>
        <div className="dooh-sandal"><i className="fan-sandal fan-left"/><i className="fan-sandal fan-right"/><i className="fan-sandal fan-main"><b>reditus</b></i></div>
        <div className="campaign-copy"><strong>conforto para<br/>seus anúncios.</strong></div>
      </div>
      <div className="billboard-post"/>
    </div>
    <div className="street"><i className="car car-one"/><i className="car car-two"/><i className="bus"/></div>
    <span className="stage-label">DOOH em movimento ↗</span>
  </div>;
}

function Dashboard() {
  return <div className="dashboard" aria-label="Dashboard demonstrativo da Reditus">
    <div className="dash-top"><span><i/><i/><i/> reditus / campanha</span><b><u/> AO VIVO</b></div>
    <div className="dash-title"><small>SISTEMA DE RESULTADOS</small><strong>dados em<br/>movimento</strong></div>
    <div className="dash-kpis">
      <section><small>INTERAÇÃO</small><b>18<em>%</em></b><span>simulação</span></section>
      <section><small>CONCLUSÃO</small><b>71<em>%</em></b><span>simulação</span></section>
      <section><small>FREQUÊNCIA</small><b>3,1<em>x</em></b><span>simulação</span></section>
    </div>
    <div className="dash-bottom">
      <div className="dash-bars">{[44,68,51,84,63,92,76,100,82].map((h,i)=><i key={i} style={{"--bar":`${h}%`} as React.CSSProperties}/>)}</div>
      <div className="dash-reading"><small>LEITURA EXECUTIVA</small><p>A área A concentrou maior interação no período noturno. O próximo ajuste prioriza esse recorte e o criativo B.</p></div>
    </div>
    <span className="dash-disclaimer">dados ilustrativos para demonstração visual</span>
  </div>;
}

function Slide({ index }: { index:number }) {
  if(index===0) return <article className="p-slide cover-slide dark">
    <Frame light/>
    <div className="hero-copy slide-reveal"><p className="p-kicker">FORMATOS CRIATIVOS · MÍDIA PRECISA</p><h1>presença<br/><em>que se nota.</em></h1><p>Rich Media, áudio, streaming e DOOH para encontrar o público nos lugares e momentos que importam.</p></div>
    <div className="hero-object">
      <div className="halo"/><div className="hero-orbit oa"/><div className="hero-orbit ob"/>
      <div className="hero-slab"><div className="hero-brand"><Brand/><small>MÍDIA EM MOVIMENTO</small></div></div>
      <div className="hero-tag t1">engaja™</div><div className="hero-tag t2">100% presença</div>
    </div>
  </article>;

  if(index===1) return <article className="p-slide manifesto-slide dark">
    <Frame light/>
    <div className="manifesto-type slide-reveal">
      <p className="p-kicker">NÃO É SOBRE APARECER</p>
      <h2><span>É SOBRE</span><em>interromper</em><span>o automático.</span></h2>
    </div>
    <p className="manifesto-copy slide-reveal">A Reditus transforma espaços de mídia em momentos de marca. Não é formato genérico, nem métrica vazia: é criatividade em movimento, com retorno mensurável.</p>
  </article>;

  if(index===2) return <article className="p-slide positioning-slide paper">
    <Frame/>
    <div className="position-copy slide-reveal"><h2>uma campanha.<br/><em>quatro fases conectadas.</em></h2><p>A Reditus organiza a estratégia como um ciclo: define onde atuar, encontra o público, escolhe o formato e transforma o resultado em próxima decisão.</p></div>
    <div className="position-process"><div className="phase-loop"><div className="phase-core"><Eye/><strong>estratégia<br/>conectada</strong></div><i className="phase-track"/><i className="phase-pulse"/>{[["01","território","onde atuar"],["02","segmentação","quem alcançar"],["03","formato","como aparecer"],["04","retorno","o que aprendemos"]].map((x,i)=><section key={x[0]} className={`phase-node p${i+1}`}><b>{x[0]}</b><strong>{x[1]}</strong><small>{x[2]}</small></section>)}</div></div>
  </article>;

  if(index===3) return <article className="p-slide geo-slide paper">
    <Frame/>
    <div className="geo-copy slide-reveal"><p className="p-kicker">DIFERENCIAL · GEOLOCALIZAÇÃO</p><h2>seu público não vive<br/><em>em círculos.</em></h2><p>O polígono acompanha o desenho real da oportunidade e dá mais controle sobre onde a campanha acontece.</p><div className="geo-uses"><span>lojas</span><span>eventos</span><span>corredores</span><span>múltiplas áreas</span></div></div>
    <GeoMap/>
  </article>;

  if(index===4) return <article className="p-slide rich-slide dark">
    <Frame light/>
    <div className="scene-copy slide-reveal"><p className="p-kicker">01 / RICH MEDIA</p><h2>o anúncio<br/>tem <em>vida.</em></h2><p>Escolha um formato e veja como a experiência pode ganhar movimento.</p></div>
    <RichMediaShowcase/>
  </article>;

  if(index===5) return <article className="p-slide audio-slide dark">
    <Frame light/>
    <AudioPlayer/>
    <div className="scene-copy right slide-reveal"><p className="p-kicker">02 / ÁUDIO E STREAMING</p><h2>quando a<br/>atenção <em>escuta.</em></h2><p>Presença entre faixas, podcasts e rádio digital: momentos de atenção exclusiva, sem concorrência visual.</p><strong className="micro-list">Spotify · Deezer · Podcasts · Rádio digital</strong></div>
  </article>;

  if(index===6) return <article className="p-slide dooh-slide dark">
    <Frame light/>
    <div className="scene-copy slide-reveal"><p className="p-kicker">03 / DOOH</p><h2>a cidade<br/>também <em>rola.</em></h2><p>Nas maiores telas digitais do Brasil, sua campanha aparece no fluxo. Metrô, shopping, aeroporto e Uber.</p><div className="dooh-proof"><span><b>60K+</b><small>faces digitais</small></span><span><b>15+</b><small>capitais e grandes cidades</small></span><span><b>100%</b><small>compra programática</small></span></div></div>
    <DoohCity/>
  </article>;

  if(index===7) return <article className="p-slide workflow-slide dark">
    <Frame light/>
    <div className="workflow-head slide-reveal"><p className="p-kicker">DO BRIEFING AO RELATÓRIO</p><h2>como <em>trabalhamos.</em></h2></div>
    <WorkFlow/>
  </article>;

  if(index===8) return <article className="p-slide dashboard-slide dark">
    <Frame light/>
    <div className="dash-copy slide-reveal"><p className="p-kicker">DASHBOARD E MENSURAÇÃO</p><h2>não vendemos clique.<br/><em>vendemos retorno.</em></h2><p>Entrega, contexto e resposta viram leitura para a próxima decisão.</p></div>
    <Dashboard/>
  </article>;

  return <article className="p-slide contact-slide acid">
    <div className="contact-brand"><Brand/><small>MÍDIA EM MOVIMENTO</small></div>
    <div className="contact-copy slide-reveal"><p className="p-kicker">PRÓXIMO PASSO</p><h2>vamos colocar<br/>sua marca <em>em cena?</em></h2><a href="mailto:comercial@reditusmidia.com.br">desenhar uma estratégia ↗</a></div>
    <div className="contact-info"><span>comercial@reditusmidia.com.br</span><span>www.reditusmidia.com.br</span></div>
    <div className="contact-eye"><Eye large/></div>
  </article>;
}

export default function Apresentacao() {
  const [active,setActive]=useState(0);
  const [auto,setAuto]=useState(false);
  const [capture,setCapture]=useState(false);
  const wheelLock=useRef(false);
  const go=useCallback((next:number)=>setActive(Math.max(0,Math.min(TOTAL-1,next))),[]);

  useEffect(()=>{
    const query=new URLSearchParams(window.location.search);
    setActive(Math.max(0,Math.min(TOTAL-1,(Number(query.get("slide"))||1)-1)));
    setCapture(query.get("capture")==="1");
  },[]);

  useEffect(()=>{
    if(capture)return;
    const key=(event:KeyboardEvent)=>{
      if(["ArrowRight","ArrowDown","PageDown"," "].includes(event.key)){event.preventDefault();go(active+1)}
      if(["ArrowLeft","ArrowUp","PageUp"].includes(event.key)){event.preventDefault();go(active-1)}
      if(event.key==="Home")go(0); if(event.key==="End")go(TOTAL-1);
    };
    const wheel=(event:WheelEvent)=>{
      if(wheelLock.current||Math.abs(event.deltaY)<18)return;
      wheelLock.current=true; go(active+(event.deltaY>0?1:-1));
      window.setTimeout(()=>{wheelLock.current=false},650);
    };
    window.addEventListener("keydown",key); window.addEventListener("wheel",wheel,{passive:true});
    return()=>{window.removeEventListener("keydown",key);window.removeEventListener("wheel",wheel)};
  },[active,capture,go]);

  useEffect(()=>{if(!auto||capture)return;const timer=window.setInterval(()=>setActive(v=>v===TOTAL-1?0:v+1),9000);return()=>window.clearInterval(timer)},[auto,capture]);

  if(capture)return <main className="presentation-capture"><Slide index={active}/></main>;
  return <main className="presentation-shell">
    <div className="presentation-stage"><Slide key={active} index={active}/></div>
    <nav className="presentation-controls" aria-label="Controles da apresentação">
      <button onClick={()=>go(active-1)} disabled={active===0} aria-label="Tela anterior">←</button>
      <div className="presentation-dots">{Array.from({length:TOTAL},(_,i)=><button key={i} className={i===active?"active":""} onClick={()=>go(i)} aria-label={`Ir para tela ${i+1}`}/>)}</div>
      <span>{String(active+1).padStart(2,"0")} / {TOTAL}</span>
      <button className={auto?"auto active":"auto"} onClick={()=>setAuto(v=>!v)}>{auto?"pausar":"auto"}</button>
      <button onClick={()=>go(active+1)} disabled={active===TOTAL-1} aria-label="Próxima tela">→</button>
    </nav>
    <div className="presentation-progress"><i style={{width:`${((active+1)/TOTAL)*100}%`}}/></div>
  </main>;
}
