import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';

const InfoPage = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      setTimeout(() => { // Ensures elements are rendered
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // A slight delay can help with timing issues
    }
  }, [location.hash]); // Depend on hash to re-run

  return (
    <div className='info-page-container'>
      <section id="diagnostic-centers">
        <h2>List of Diagnostic Centers</h2>
        <p>Blood on the Floor is a suite in nine movements composed for orchestra and jazz trio by Mark-Anthony Turnage (pictured). It was composed between 1993 and 1996, during which Turnage's brother died of a drug overdose, causing drug culture to be one of its main themes. It is also influenced by the paintings of Francis Bacon and Heather Betts; the title is an adaptation of Bacon's Blood on Pavement. The composition has been described as being part of the third stream genre and is written as a concerto grosso featuring a blend of classical, jazz, non-western and electronic instruments. It contains space for soloists to improvise in four of its movements. The suite shows elements of non-functional harmony and has complex rhythmic changes, often changing metre every bar. Motifs recur throughout the work. It was premiered in London in May 1996, and received a mixed reception from critics. Some enjoyed the suite's fusion of classical and jazz music, while others found it to be an unfulf, Blood on the Floor was composed by the British composer Mark-Anthony Turnage between 1993 and 1996.[1][2] During his compositional process, Turnage used sketches he had produced during a period of collaboration with the saxophonist Martin Robertson. These sketches were used to create the prologue of the suite.[3]

A musical ensemble receives applause at the end of a concert.
Blood on the Floor was commissioned by the Ensemble Modern.
The piece was commissioned in 1993 by the Ensemble Modern—a German group dedicated to contemporary classical music[1][4]—for an evening jazz event with pieces by George Gershwin, Leonard Bernstein and George Antheil.[3][5][6] The version Turnage produced for the event was ten minutes long and was performed in 1994.[6] After the event, Turnage expanded the piece into a nine movement suite; the final composition ended up being a little more than an hour long.[5][6] This was largely due to persuasion from the Ensemble Modern, who have a history of working on larger musical projects.[3] During the composition of Blood on the Floor, Turnage consulted Robertson, John Scofield and Peter Erskine, who would be playing in the jazz trio with the Ensemble Modern.[7] Erskine objected to the level of notation in the drum kit part for the suite, leading Turnage to have a "culture shock" after restricting his score to its essential elements to allow Erskine more freedom.[8]

Blood on the Floor takes inspiration from the paintings of Francis Bacon as with Turnage's previous works, like Three Screaming Popes.[9] The suite's name is an adaptation of Bacon's painting, Blood on Pavement.[1][10] Other works by Bacon, as well a painting by the Australian artist Heather Betts, influence elements of the suite.[11]Blood on the Floor reflects Turnage's personal feelings on the death of his brother Andrew,[12] who died of a drug overdose during its composition.[5][13] As a consequence, drug culture is an overarching theme in the suite.[14] Due to this, the music in Blood on the Floor is often quite harsh, with Turnage commenting that it was "probably the nastiest thing I have written" Blood on the Floor is a suite in nine movements composed for orchestra and jazz trio by Mark-Anthony Turnage. It was composed over a span of three years (1993–1996) after a commission from the Ensemble Modern—a German music group—to produce a piece for an evening jazz event in 1994. After the performance, Turnage expanded the piece into the larger nine movement suite that is now performed. During this period of composition, Turnage's brother Andrew died of a drug overdose, shaping the music greatly. As a result, drug culture is one of the main themes in the suite. Blood on the Floor also draws influences from the paintings of Francis Bacon and Heather Betts; the suite's title is an adaptation of Bacon's painting Blood on Pavement.

Like other compositions by Turnage, Blood on the Floor incorporates elements of both classical and jazz music. Due to this, it has been described as being part of the "third stream" genre, a term coined by Turnage's former teacher Gunther Schuller. The suite is written as a concerto grosso and features a blend of classical, jazz, non-western and electronic instruments. As part of this fusion, the suite contains space for soloists to improvise in four of its movements. Blood on the Floor shows elements of non-functional harmony and has complex rhythmic changes, often changing metre every bar. Motifs are found recurring throughout the suite.

Blood on the Floor was premiered by the Ensemble Modern at the Queen Elizabeth Hall, London, in May 1996. The suite received a mixed reception from music critics. Some enjoyed the suite's fusion of classical and jazz music, while others found it to be an unfulfilling combination. Outside of the Ensemble Modern, Blood on the Floor has been performed by various ensembles, including the Berlin Philharmonic, Melbourne Symphony Orchestra and Boston Symphony Orchestra.

Composition
Blood on the Floor was composed by the British composer Mark-Anthony Turnage between 1993 and 1996.[1][2] During his compositional process, Turnage used sketches he had produced during a period of collaboration with the saxophonist Martin Robertson. These sketches were used to create the prologue of the suite.[3]

A musical ensemble receives applause at the end of a concert.
Blood on the Floor was commissioned by the Ensemble Modern.
The piece was commissioned in 1993 by the Ensemble Modern—a German group dedicated to contemporary classical music[1][4]—for an evening jazz event with pieces by George Gershwin, Leonard Bernstein and George Antheil.[3][5][6] The version Turnage produced for the event was ten minutes long and was performed in 1994.[6] After the event, Turnage expanded the piece into a nine movement suite; the final composition ended up being a little more than an hour long.[5][6] This was largely due to persuasion from the Ensemble Modern, who have a history of working on larger musical projects.[3] During the composition of Blood on the Floor, Turnage consulted Robertson, John Scofield and Peter Erskine, who would be playing in the jazz trio with the Ensemble Modern.[7] Erskine objected to the level of notation in the drum kit part for the suite, leading Turnage to have a "culture shock" after restricting his score to its essential elements to allow Erskine more freedom.[8]

Blood on the Floor takes inspiration from the paintings of Francis Bacon as with Turnage's previous works, like Three Screaming Popes.[9] The suite's name is an adaptation of Bacon's painting, Blood on Pavement.[1][10] Other works by Bacon, as well a painting by the Australian artist Heather Betts, influence elements of the suite.[11]Blood on the Floor reflects Turnage's personal feelings on the death of his brother Andrew,[12] who died of a drug overdose during its composition.[5][13] As a consequence, drug culture is an overarching theme in the suite.[14] Due to this, the music in Blood on the Floor is often quite harsh, with Turnage commenting that it was "probably the nastiest thing I have written".[15]

Instrumentation
Blood on the Floor is written as a concerto grosso, a form of concerto played by a group of soloists.[16] The concertino consists of a jazz trio of electric guitar, soprano saxophone (doubling alto saxophone and bass clarinet)[17] and drum kit.[4][18] For the suite's orchestration, Turnage uses a mixture of orchestral and non-orchestral instruments, including instruments usually associated with jazz, as well as unusual instruments like synthesisers and scaffolding.[a] The score calls for a large ripieno consisting of the following instruments:[20]</p>
      </section>
      <section id="contact-us">
        <h2>Contact Us</h2>
        {/* Content for Contact Us */}
      </section>
    </div>
  );
};

export default InfoPage;
