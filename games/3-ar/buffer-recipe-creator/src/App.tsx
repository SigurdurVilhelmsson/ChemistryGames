import { useState } from 'react';
import type { BufferProblem, Feedback } from './types';
import { BUFFER_PROBLEMS } from './data/problems';

function App() {
  const [currentProblem, setCurrentProblem] = useState<BufferProblem>(BUFFER_PROBLEMS[0]);
  const [difficulty, setDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [acidMassInput, setAcidMassInput] = useState('');
  const [baseMassInput, setBaseMassInput] = useState('');
  const [showSolution, setShowSolution] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [score, setScore] = useState(0);
  const [problemsAttempted, setProblemsAttempted] = useState(0);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [isFlaskFilling, setIsFlaskFilling] = useState(false);
  const [currentPH, setCurrentPH] = useState(7.0);
  const [showInstructions, setShowInstructions] = useState(false);

  // Filter problems by difficulty
  const filteredProblems = BUFFER_PROBLEMS.filter(p =>
    difficulty === 'all' || p.difficulty === difficulty
  );

  // Check answer
  const checkAnswer = () => {
    if (currentProblem.rangeQuestion) {
      setShowSolution(true);
      setFeedback({
        correct: true,
        message: 'Rétt! Skoðaðu lausnina fyrir púffersvæðið.'
      });
      return;
    }

    const acidMass = parseFloat(acidMassInput);
    const baseMass = parseFloat(baseMassInput);

    if (isNaN(acidMass) || isNaN(baseMass)) {
      setFeedback({
        correct: false,
        message: 'Vinsamlegast sláðu inn gildi fyrir bæði efnin.'
      });
      return;
    }

    const tolerance = 0.05; // 5% tolerance
    const acidCorrect = Math.abs(acidMass - currentProblem.correctAcidMass) / currentProblem.correctAcidMass <= tolerance;
    const baseCorrect = Math.abs(baseMass - currentProblem.correctBaseMass) / currentProblem.correctBaseMass <= tolerance;

    setProblemsAttempted(prev => prev + 1);

    if (acidCorrect && baseCorrect) {
      const points = currentProblem.difficulty === 'beginner' ? 100 :
                     currentProblem.difficulty === 'intermediate' ? 150 : 200;
      setScore(prev => prev + points);
      setProblemsSolved(prev => prev + 1);
      setFeedback({
        correct: true,
        message: `Frábært! +${points} stig`
      });
      setIsFlaskFilling(true);
      setCurrentPH(currentProblem.targetPH);
      setTimeout(() => setIsFlaskFilling(false), 2000);
    } else {
      let message = 'Ekki alveg rétt. ';
      if (!acidCorrect && !baseCorrect) {
        message += 'Bæði gildin eru röng.';
      } else if (!acidCorrect) {
        message += 'Sýrumagn er rangt.';
      } else {
        message += 'Basamagn er rangt.';
      }
      setFeedback({
        correct: false,
        message
      });
    }

    setShowSolution(true);
  };

  // Next problem
  const nextProblem = () => {
    const currentIndex = filteredProblems.findIndex(p => p.id === currentProblem.id);
    const nextIndex = (currentIndex + 1) % filteredProblems.length;
    setCurrentProblem(filteredProblems[nextIndex]);
    setAcidMassInput('');
    setBaseMassInput('');
    setShowSolution(false);
    setFeedback(null);
    setCurrentPH(7.0);
  };

  // Random problem
  const randomProblem = () => {
    const randomIndex = Math.floor(Math.random() * filteredProblems.length);
    setCurrentProblem(filteredProblems[randomIndex]);
    setAcidMassInput('');
    setBaseMassInput('');
    setShowSolution(false);
    setFeedback(null);
    setCurrentPH(7.0);
  };

  // Get pH marker position (0-14 scale)
  const getPhMarkerPosition = () => {
    return (currentPH / 14) * 100;
  };

  // Get flask liquid color based on pH
  const getFlaskColor = () => {
    if (currentPH < 4) return 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)';
    if (currentPH < 6) return 'linear-gradient(135deg, #ffa94d 0%, #ff922b 100%)';
    if (currentPH < 8) return 'linear-gradient(135deg, #69db7c 0%, #51cf66 100%)';
    if (currentPH < 10) return 'linear-gradient(135deg, #4dabf7 0%, #339af0 100%)';
    return 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🧪 Púfferuppskrift
        </h1>
        <p className="text-lg text-gray-600">
          Henderson-Hasselbalch Jafnan
        </p>
        <button
          onClick={() => setShowInstructions(!showInstructions)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {showInstructions ? 'Fela leiðbeiningar' : 'Sýna leiðbeiningar'}
        </button>
      </div>

      {/* Instructions */}
      {showInstructions && (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-blue-900 mb-4">📖 Leiðbeiningar</h2>
          <div className="text-blue-800 space-y-2">
            <p><strong>Markmið:</strong> Reikna magn veikrar sýru og samstæðs basa til að búa til púffer við ákveðið pH.</p>
            <p><strong>Henderson-Hasselbalch jafnan:</strong></p>
            <div className="bg-white p-3 rounded font-mono text-sm">
              pH = pKa + log([A⁻]/[HA])
            </div>
            <p><strong>Skref:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Reikna hlutfallið [A⁻]/[HA]</li>
              <li>Nota heildarstyrk til að finna [A⁻] og [HA]</li>
              <li>Margfalda með rúmmáli til að fá mól</li>
              <li>Margfalda með mólmassa til að fá grömm</li>
            </ol>
            <p><strong>Villumörk:</strong> ±5% eru ásættanleg</p>
          </div>
        </div>
      )}

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {score}
          </div>
          <div className="text-sm text-gray-600">Stig</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {problemsSolved}
          </div>
          <div className="text-sm text-gray-600">Leyst</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {problemsAttempted}
          </div>
          <div className="text-sm text-gray-600">Tilraunir</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {problemsAttempted > 0 ? Math.round((problemsSolved / problemsAttempted) * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600">Nákvæmni</div>
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          <span className="font-medium text-gray-700">Erfiðleikastig:</span>
          <button
            onClick={() => setDifficulty('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              difficulty === 'all'
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Allt ({BUFFER_PROBLEMS.length})
          </button>
          <button
            onClick={() => setDifficulty('beginner')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              difficulty === 'beginner'
                ? 'bg-green-600 text-white'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            Byrjandi (10)
          </button>
          <button
            onClick={() => setDifficulty('intermediate')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              difficulty === 'intermediate'
                ? 'bg-yellow-600 text-white'
                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
            }`}
          >
            Miðstig (12)
          </button>
          <button
            onClick={() => setDifficulty('advanced')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              difficulty === 'advanced'
                ? 'bg-red-600 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            Háþróað (8)
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Problem & Input */}
        <div className="space-y-6">
          {/* Problem Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Verkefni #{currentProblem.id}
              </h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                currentProblem.difficulty === 'beginner' ? 'bg-green-600' :
                currentProblem.difficulty === 'intermediate' ? 'bg-yellow-600' : 'bg-red-600'
              }`}>
                {currentProblem.difficulty === 'beginner' ? 'Byrjandi' :
                 currentProblem.difficulty === 'intermediate' ? 'Miðstig' : 'Háþróað'}
              </span>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
                <p className="text-sm text-gray-600 mb-1">Samhengi:</p>
                <p className="font-medium text-gray-800">{currentProblem.context}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Púfferkerfi:</p>
                  <p className="font-bold text-lg chem-formula">{currentProblem.system}</p>
                </div>
                {!currentProblem.rangeQuestion && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Markmiðs pH:</p>
                    <p className="font-bold text-lg text-blue-600">{currentProblem.targetPH.toFixed(2)}</p>
                  </div>
                )}
              </div>

              {!currentProblem.rangeQuestion && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">pKa:</p>
                      <p className="font-bold text-lg">{currentProblem.pKa.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600">Rúmmál:</p>
                      <p className="font-bold text-lg">{currentProblem.volume} L</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Heildarstyrk púffers:</p>
                    <p className="font-bold text-lg">{currentProblem.totalConcentration.toFixed(3)} M</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Input Card */}
          {!currentProblem.rangeQuestion && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                🧮 Þinn Útreikningur
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veikt sýra ({currentProblem.acidName}):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={acidMassInput}
                      onChange={(e) => setAcidMassInput(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                    />
                    <span className="text-gray-600 font-medium">g</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Samstæður basi ({currentProblem.baseName}):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={baseMassInput}
                      onChange={(e) => setBaseMassInput(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none text-lg"
                    />
                    <span className="text-gray-600 font-medium">g</span>
                  </div>
                </div>

                <button
                  onClick={checkAnswer}
                  className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-lg"
                >
                  Athuga Svar
                </button>
              </div>

              {/* Feedback */}
              {feedback && (
                <div className={`mt-4 p-4 rounded-lg ${
                  feedback.correct
                    ? 'bg-green-100 border-2 border-green-500 pulse-success'
                    : 'bg-red-100 border-2 border-red-500 shake'
                }`}>
                  <p className={`font-bold text-lg ${
                    feedback.correct ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {feedback.message}
                  </p>
                </div>
              )}
            </div>
          )}

          {currentProblem.rangeQuestion && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📊 Spurning um Púffersvæði
              </h3>
              <p className="text-gray-700 mb-4">
                Fyrir þetta púfferkerfi með pKa = {currentProblem.pKa}, hvaða pH svæði getur það virkilega viðhaldið?
              </p>
              <button
                onClick={checkAnswer}
                className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg transition-colors text-lg"
              >
                Sýna Svar
              </button>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={nextProblem}
              className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Næsta Verkefni →
            </button>
            <button
              onClick={randomProblem}
              className="flex-1 py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              🎲 Handahófskennt
            </button>
          </div>
        </div>

        {/* Right Column - Visualization & Solution */}
        <div className="space-y-6">
          {/* pH Scale */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              📏 pH Mæling
            </h3>
            <div className="mb-4">
              <div className="ph-scale">
                <div
                  className="ph-marker"
                  style={{left: `${getPhMarkerPosition()}%`}}
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>0 (Sýra)</span>
                <span>7 (Hlutlaust)</span>
                <span>14 (Basi)</span>
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Núverandi pH:</p>
              <p className="text-4xl font-bold text-blue-600">{currentPH.toFixed(2)}</p>
              {!currentProblem.rangeQuestion && (
                <p className="text-sm text-gray-600 mt-2">
                  Markmiðs: {currentProblem.targetPH.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Flask Visualization */}
          {!currentProblem.rangeQuestion && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                ⚗️ Blandingarmyndræn
              </h3>
              <div className="flask-container">
                <div className="flask">
                  <div className="flask-neck"></div>
                  <div className="flask-body">
                    <div
                      className={`flask-liquid ${isFlaskFilling ? 'filling swirl' : ''}`}
                      style={{
                        background: getFlaskColor(),
                        height: feedback?.correct ? '80%' : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                {feedback?.correct
                  ? '✓ Púffer tilbúinn!'
                  : 'Búðu til púfferinn til að sjá blöndun'}
              </p>
            </div>
          )}

          {/* Step-by-Step Solution */}
          {showSolution && !currentProblem.rangeQuestion && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📝 Skref-fyrir-skref Lausn
              </h3>

              <div className="solution-step">
                <div className="step-title">Skref 1: Reikna hlutfallið [A⁻]/[HA]</div>
                <div className="step-math">
                  pH = pKa + log([A⁻]/[HA])<br/>
                  {currentProblem.targetPH.toFixed(2)} = {currentProblem.pKa.toFixed(2)} + log([A⁻]/[HA])<br/>
                  {(currentProblem.targetPH - currentProblem.pKa).toFixed(2)} = log([A⁻]/[HA])<br/>
                  [A⁻]/[HA] = 10^{(currentProblem.targetPH - currentProblem.pKa).toFixed(2)} = {currentProblem.ratio.toFixed(2)}
                </div>
              </div>

              <div className="solution-step">
                <div className="step-title">Skref 2: Setja upp jöfnur</div>
                <div className="step-math">
                  Látum x = [HA] og y = [A⁻]<br/>
                  x + y = {currentProblem.totalConcentration.toFixed(3)} M (heildarstyrk)<br/>
                  y/x = {currentProblem.ratio.toFixed(2)} (hlutfall úr skrefi 1)
                </div>
              </div>

              <div className="solution-step">
                <div className="step-title">Skref 3: Leysa</div>
                <div className="step-math">
                  y = {currentProblem.ratio.toFixed(2)}x<br/>
                  x + {currentProblem.ratio.toFixed(2)}x = {currentProblem.totalConcentration.toFixed(3)}<br/>
                  {(1 + currentProblem.ratio).toFixed(2)}x = {currentProblem.totalConcentration.toFixed(3)}<br/>
                  x = {(currentProblem.totalConcentration / (1 + currentProblem.ratio)).toFixed(4)} M ([HA])<br/>
                  y = {(currentProblem.totalConcentration * currentProblem.ratio / (1 + currentProblem.ratio)).toFixed(4)} M ([A⁻])
                </div>
              </div>

              <div className="solution-step">
                <div className="step-title">Skref 4: Umbreyta í mól</div>
                <div className="step-math">
                  Mól {currentProblem.acidName} = {(currentProblem.totalConcentration / (1 + currentProblem.ratio)).toFixed(4)} M × {currentProblem.volume} L = {currentProblem.correctAcidMoles.toFixed(4)} mol<br/>
                  Mól {currentProblem.baseName} = {(currentProblem.totalConcentration * currentProblem.ratio / (1 + currentProblem.ratio)).toFixed(4)} M × {currentProblem.volume} L = {currentProblem.correctBaseMoles.toFixed(4)} mol
                </div>
              </div>

              <div className="solution-step">
                <div className="step-title">Skref 5: Umbreyta í grömm</div>
                <div className="step-math">
                  Massi {currentProblem.acidName} = {currentProblem.correctAcidMoles.toFixed(4)} mol × {currentProblem.acidMolarMass.toFixed(2)} g/mol = <strong>{currentProblem.correctAcidMass.toFixed(2)} g</strong><br/>
                  Massi {currentProblem.baseName} = {currentProblem.correctBaseMoles.toFixed(4)} mol × {currentProblem.baseMolarMass.toFixed(2)} g/mol = <strong>{currentProblem.correctBaseMass.toFixed(2)} g</strong>
                </div>
              </div>

              {currentProblem.stockSolution && (
                <div className="solution-step">
                  <div className="step-title">Viðbót: Birgðalausnir</div>
                  <div className="step-math">
                    Rúmmál 1.0 M {currentProblem.acidName} = {currentProblem.acidVolume?.toFixed(1)} mL<br/>
                    Rúmmál 1.0 M {currentProblem.baseName} = {currentProblem.baseVolume?.toFixed(1)} mL<br/>
                    Þynna að {(currentProblem.volume * 1000).toFixed(0)} mL heildar
                  </div>
                </div>
              )}

              {currentProblem.phAdjustment && (
                <div className="solution-step">
                  <div className="step-title">Viðbót: pH Leiðrétting</div>
                  <div className="step-math">
                    Byrja með {(currentProblem.totalConcentration * currentProblem.volume).toFixed(3)} mol CH₃COOH<br/>
                    Bæta við {currentProblem.correctBaseMass.toFixed(2)} g NaOH<br/>
                    NaOH umbreytir CH₃COOH → CH₃COO⁻
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Range Question Answer */}
          {showSolution && currentProblem.rangeQuestion && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                📝 Púffersvæði
              </h3>
              <div className="solution-step">
                <div className="step-title">Virkt púffersvæði</div>
                <div className="step-math">
                  Almenn regla: pKa ± 1<br/>
                  pKa = {currentProblem.pKa}<br/>
                  <br/>
                  <strong>Svæði: {currentProblem.effectiveRange}</strong><br/>
                  <br/>
                  Fyrir utan þetta svæði er púffermagn of lítið til að vera árangursríkt.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-600 text-sm">
        <p>🧪 Kvennaskólinn í Reykjavík - Efnafræðileikir</p>
        <p className="mt-2">Henderson-Hasselbalch jafnan: pH = pKa + log([A⁻]/[HA])</p>
      </div>
    </div>
  );
}

export default App;
