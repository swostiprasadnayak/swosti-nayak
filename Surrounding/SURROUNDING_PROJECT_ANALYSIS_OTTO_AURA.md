# SURROUNDING PROJECT ANALYSIS
## Deep Dive into Otto & Aura: Extracting Research & Design Patterns

---

## EXECUTIVE SUMMARY

**Otto** and **Aura** are two ambitious multisensory experience design projects that are **architecturally similar to Surrounding** but approach the problem from different angles:

- **Otto**: Smart home automation for **task/mood transitions** (preventative ambient design)
- **Aura**: Therapeutic multisensory experience in a **dedicated physical environment** (intensive intervention)
- **Surrounding**: Ambient computing for **proactive sensory optimization** across contexts (Home, Workspace, Commute)

Together, they provide a **complete playbook** for how to approach, research, and design multisensory systems at a Google-level.

---

## PROJECT 1: OTTO - Smart Home Automation for Task Transitions

### Overview
**Problem Identified**: 
- "The disappearance of third places has forced remote workers to blend professional and personal lives at home"
- Users struggle to mentally transition between tasks because **physical environment doesn't change automatically**
- Manual setup (furniture, lighting, sound) is tedious and disrupts flow state

**Solution**: A smart home system (3-device ecosystem: Hub + smart devices) that automatically creates sensory "scenes" for different tasks/moods

### Research Methodology (Critical for Surrounding)

**Research Activities**:
1. **Cultural Probes** (Qualitative Primary Research)
   - Distributed to 5 participants
   - Asked to visually map their routines at home
   - **Key finding**: Users intentionally compartmentalize spaces to establish boundaries

2. **Qualitative Survey** (Mixed Sample)
   - 35+ participants, ages 16-50
   - Asked about: frustrations with blurry boundaries, difficulty setting up spaces
   - **Key finding**: People want flexible spaces that "seamlessly transition" with clear distinction

3. **Problem Synthesis**
   - Users feel **friction during transitions** → interrupts flow state
   - Unexpected events/interruptions → forces hasty environment adjustments
   - Loss of autonomy → home automation feels invasive/controlling

### Key Insights About User Needs

Otto discovered 4 distinct user needs:

1. **Balance** - Compartmentalize different activities with clear sensory distinction
2. **Adaptability** - System should anticipate & respond to unexpected situations
3. **Autonomy** - Transparent, controllable IoT without surveillance feeling
4. **Ease of Setup** - Don't make users think about device selection (applied **Hick's Law** - reduce decision load)

### Solution Architecture (Highly Relevant to Surrounding)

**Three-Device System**:
1. **Hub** (Logic processor)
   - Processes environmental data
   - Sends commands to smart devices
   - Acts as "quiet force in background"
   - Design principle: **Humble presence** (not flashy, integrated into home)

2. **App Interface**
   - Scene creation with **presets** (not from-scratch customization)
   - Applied Parkinson's Law: users given suggested scenes, then customize
   - Shift from flexibility → structure reduced decision paralysis

3. **Smart Devices** (lighting, sound, temperature control)
   - Orchestrated through scenes
   - Gradual adjustments (not jarring changes)

### Key Design Decisions (Applicable to Surrounding)

**1. Scene-Based UI (Not Device-Based)**
```
Problem: Users overwhelmed by selecting individual devices
Solution: Group devices into thematic "scenes" 
- "Deep Work" = dim blue lighting + white noise + cooler temperature
- "Wind Down" = warm amber lighting + nature sounds + slightly warmer temperature
- "Video Call" = bright white lighting + cancel background noise

Why this matters for Surrounding:
You'll have similar challenge with 5+ sensory modalities (visual, audio, 
thermal, scent, haptic). Don't ask users to adjust each individually.
Create preset "states" then allow fine-tuning.
```

**2. Preset Scenes with User Customization**
- Initial iteration: Full flexibility → Users paralyzed by choice
- Refined iteration: Suggested scenes (name + description) → Users customize based on personal preference
- **Philosophy**: Provide "safe baseline" then let users discover what works

**3. Trust-Building Through Physical Design**
- Otto's physical device was deliberately designed as a **statement piece** (not hidden)
- Research showed: Users distrust smart home because they don't understand it
- Solution: Make device **visible and inviting** to participate in curation
- Users need to feel they can **see and understand** what's happening

**4. Gradual Changes, Not Jarring Shifts**
- Otto analyzes environment constantly, makes adjustments gradually
- Prevents jarring sensory disruption (which could cause motion sickness)
- Philosophy: **Homeostasis for the home** (like biological homeostasis)

**5. Proximity-Based Device Discovery**
- Early iteration: All devices available regardless of location (choice overload)
- Refined iteration: Show only **nearby devices** contextually
- User in bedroom → see bedroom lights & fans
- User in living room → see living room lights & speakers
- Reduces cognitive load through **spatial context**

**6. Interaction Design: Tactile > Screen**
- Otto intentionally **disabled touchscreen** to prevent accidental inputs
- Uses rotary/tactile interaction instead
- **Why**: Forces intentional, deliberate interaction (not mindless swiping)
- Conveys: "You are collaborating with system, not controlling it passively"

### Stimuli Modalities Addressed (Otto)
- Visual (lighting color, brightness, color temperature)
- Aural (sound selection, volume, type: white noise, music, nature sounds)
- Thermal (temperature adjustment)
- *Did NOT include*: Scent, Haptic, Taste

**This is the major difference from Surrounding** - Otto simplified to 3 modalities to reduce complexity.

### Problems Otto Identified (And Solutions)

| Problem | Otto's Solution | Relevance to Surrounding |
|---------|-----------------|------------------------|
| Users distrust IoT | Make device visible/beautiful, invite participation | Your system processes biometrics → transparency is critical |
| Automation feels invasive | Clear "why" behind each change, easy override | Users need to understand WHY mood was inferred that way |
| Too many options | Use presets + gradual customization | 5+ sensory modalities = massive decision space |
| Jarring transitions | Gradual changes over time | Sensory desynchronization causes motion sickness |
| User confusion about setup | Guided onboarding, clear information architecture | Biometric tracking needs clear privacy explanation |

---

## PROJECT 2: AURA - Multisensory Therapy Experience

### Overview
**Problem Identified**:
- Mental health therapy is stigmatized and poorly understood
- People don't know what "mental illness" is vs. normal stress
- People don't know how to access help
- Therapy is typically one-dimensional (talk-based) without environmental support

**Solution**: A tripartite service combining:
1. Mobile app interface (booking, expectations, reflection)
2. 6-channel multisensory stimuli curation
3. Specialized physical therapy environment with MR (Mixed Reality)

### Research Methodology (Critical for Surrounding)

**Research Activities**:
1. **Qualitative Formative Research** (Foundational)
   - Focus group discussions
   - In-depth interviews
   - User surveys
   - Sample: People who had/considered/provided therapy

2. **Problem Space Identification**
   Uncovered two critical barriers:
   
   **A. Unawareness** (People don't know what they need)
   - Lack of awareness about what counts as "mental illness"
   - Don't know who to contact or how to approach it
   - Confused by myriad options on internet
   - Even people who got therapy weren't aware of specific type they received
   
   **B. Social/Cultural Taboos** (People afraid to seek help)
   - Stigma from family/culture
   - Internal questioning: "Is it even necessary?"
   - Fear of judgment from others
   - Stories of people accessing therapy in secret to avoid "embarrassment"
   
3. **Design Brief Refinement**
   - "Need to normalize conversation on therapy and mental health"
   - Make process more comfortable
   - Make channels more accessible

**Key Research Insight**: The problem isn't just the therapy experience—it's the **emotional barrier to seeking therapy**. This is why Aura designed beautiful, celebratory experience (not clinical/clinical feeling).

### Solution Architecture (Highly Relevant to Surrounding)

**Component 1: Mobile App Interface**
```
Journey:
1. Splash screen + introductory video → Set expectations
2. Onboarding → Create profile, establish channel with service
3. Home screen → Access info, book session, view journal
4. Select Theme → Choose therapy type (visual + demo clip)
5. Express Yourself → Color selection to describe emotional state
6. Help Us Help You → Terms, rights, add special requests
7. Confirm Booking → Payment gateway
8. Journal → Track completed sessions (photos, memories) + upcoming expectations
```

**Design Philosophy**: 
- Each touchpoint removes one barrier (confusion → choice → expression → commitment)
- Emotional input ("Express Yourself") = explicit permission for personalization
- Journal = creates continuity and allows reflection

**Component 2: 6-Channel Stimuli Curation**

This is **directly applicable to Surrounding**. Aura designed for ALL human senses:

1. **Visual** (40% of therapeutic impact)
   - Mixed Reality projection-based immersion (CAVE-type environment)
   - Theme-based visual narratives (immersive worlds)
   - Specialized equipment: bubble tubes, fiber optics, refraction panels
   - Design principle: Transport person mentally/emotionally to soothing narrative

2. **Aural** (30% of therapeutic impact)
   - Binaural beats (frequency-based mood regulation)
   - ASMR (autonomous sensory meridian response)
   - White noise
   - Instrumental music + natural sounds
   - Surround sound system (IMAX-type for immersion)
   - Voice assistant for guidance + sense of autonomy

3. **Tactile** (20% of therapeutic impact)
   - Vibration, texture, pressure, temperature, position
   - Equipment: bubble tubes (vibration), fiber optics (texture), tactile blankets, cushions, padded furniture
   - Therapy house plants (Peace Lily, Aloe) for touch interaction
   - Interactive switches for environmental control
   - Proprioceptive: movement through space, handling Rubik's cubes, clay work, whiteboards

4. **Olfactory** (5% of therapeutic impact)
   - Aromatherapy with therapeutic fragrances (Lavender, Yuzu, Lemon)
   - Essential oil diffusers with **regulated release**
   - Key: Symphonic assemblage of scents in varying potency/proportions over session duration
   - Design principle: Create "happy memories" via associative learning

5. **Gustatory** (3% of therapeutic impact)
   - Theme-based welcome drink (carbohydrate-based, nutritious)
   - Soothing effect on taste buds + mood brightening
   - Used at **initiation** of journey (priming)

6. **Proprioceptive** (2% of therapeutic impact)
   - User encouraged to move around environment
   - Strategically placed equipment invites exploration
   - Squeeze balls, Rubik's cubes, whiteboards, clay, crash beds
   - Space design: Capacious, ergonomic, supports free flowing movements

**Critical Insight for Surrounding**: 
Aura demonstrates that different senses have different **therapeutic weight**:
- Visual: 40% (most impactful)
- Aural: 30%
- Tactile: 20%
- Olfactory: 5%
- Gustatory: 3%
- Proprioceptive: 2%

For Surrounding, you might prioritize accordingly:
- **Primary focus**: Visual + Aural (70% of impact)
- **Secondary focus**: Thermal + Haptic (equivalent to Olfactory impact)
- **Tertiary focus**: Olfactory (most technically complex, least impactful)

### Component 3: Specialized Physical Environment Design

**Environment is Sectioned into Zones** (not open plan):

1. **Nucleus** (Central Area)
   - Epicenter of experience
   - Narrative-driven MR visuals surround user
   - Spacious bean bag seating for relaxation
   - High receptivity to ambient sounds, aromatherapy, temperature regulation
   - User sits in center, immersed in virtual world overlay

2. **Relaxation Corner**
   - Fiber optics chandelier + shimmering curtain (visual interest)
   - Bubble tubes (tactile vibration + visual)
   - Textured glass panel backdrop
   - Bean bags for loose, relaxed body positioning

3. **Recreational Corner**
   - Multicolor clay + whiteboard (creative expression)
   - Rubik's cube (critical thinking)
   - Crash beds (comfortable engagement)
   - Equipment encourages **proprioceptive engagement** while processing emotions

**Environmental Design Details**:
- **Floor & Walls**: White padded (soothing, complements dynamic colors)
- **Ceiling**: Luminous with starry night visual (sense of space, connection to nature)
- **Temperature**: Dynamic (suits theme) + user-adjustable (maintains autonomy)
- **Mirror**: Crystal-textured (responsive delight, adds visual interest)
- **Emergency**: Help switch for crisis intervention
- **Entry/Exit Corridors**: Strategically designed to ease transition in/out (prevents sensory shock)
- **Reception**: Pre-session briefing + post-session feedback collection

**Critical Insight**: The **Entry & Exit corridors** are specifically designed to ease into/out of multisensory experience. Not a jarring transition.

### Key Design Decisions (Applicable to Surrounding)

**1. Experience Therapy Dyad Framework** (Not just tech, but psychology)
```
Aura + Otto both recognize: Experience Design ≠ UX Design

Experience Design should:
- Build upon sensory stimulation
- Motivate emotional reflection
- Provide safe space for expression
- Encourage application to real life

This is what separates "ambient tech" from "ambient wellness."
```

**2. Themed Scenes (Like Otto, but psychologically driven)**
- Otto: Themes around tasks (Deep Work, Wind Down, Video Call)
- Aura: Themes around emotions/recovery (Anxiety Relief, Grief Processing, Joy Amplification)
- **Insight for Surrounding**: Your themes should be driven by **cognitive load states**, not just tasks
  - High-stress recovery
  - Deep focus enablement
  - Creative flow induction
  - Anxiety management
  - Energy restoration

**3. Applied Psychology Principles**
- **Gregory's Top-down theory** (perception shaped by expectations) → Aura uses theme-based narratives
- **Associative learning** (scents create memories) → Scent releases timed for max impact
- **Binaural beats** (frequency-based mood effects) → Specific Hz for different states
- **ASMR** (tingling sensations trigger calm) → Incorporated into audio design
- **Hick's Law** (too many choices = paralysis) → Preset scenes with customization

**For Surrounding**: Apply same psychological principles:
- Use **color psychology** in lighting
- Use **acoustic design** (Hz frequency for stress vs. focus)
- Use **temperature perception** (cooler = alertness, warmer = comfort)
- Use **scent priming** (Rosemary = memory/focus, Lavender = calm)

**4. Transparency About How System Works**
```
App shows exact settings:
- "75dB (Busy coffee shop)" ← descriptive context, not just numbers
- "22°C (Comfortable room temp)" ← helps user understand relative terms
- "Lavender (Calming)" ← why this scent, what effect expected

Philosophy: Users need to understand the LOGIC of system, not just obey it.
For Surrounding: Users need to see "Why mood was inferred as stressed?"
```

**5. Voice Assistant as Autonomy Mechanism**
- Aura includes interactive voice assistant
- User can ask questions, request changes
- Creates sense of **collaboration** not **control**
- **For Surrounding**: Local voice processing (not cloud-based) for privacy

**6. Feedback Loop for Continuous Learning**
- Aura collects post-session feedback
- Users rate experience, note what worked
- System learns user preferences over time
- Applied to Surrounding: How does system learn that user prefers warmer lighting during afternoon focus sessions?

### Problems Aura Addressed (And Solutions)

| Problem | Aura's Solution | Relevance to Surrounding |
|---------|-----------------|------------------------|
| Mental health stigmatized | Created celebratory, beautiful experience (not clinical) | Your system should feel empowering, not surveillance |
| People don't understand therapy options | Clear visual + text descriptions of each theme type | Users need to understand different "modes" |
| Overwhelm from too many customization options | Preset themed scenes, then customize | Don't let users customize 5+ sensory modalities independently |
| Sensory overload in therapeutic space | Sectioned environment with different zones | Clear spatial organization prevents overstimulation |
| Users feel loss of control | Multiple override mechanisms (voice, switches, emergency) | Users need sense of agency even in automated system |
| Difficult transitions into/out of experience | Entry/exit corridors with graduated sensory transition | Spanning between contexts requires buffering, not jarring shift |
| Unclear "why" behind recommendations | Descriptive labeling of settings with psychological context | Transparency builds trust in AI-driven systems |

---

## SYNTHESIS: What Otto & Aura Teach About Surrounding

### Pattern 1: Preset-Based UI with Customization

Both projects rejected "full customization" in favor of "guided presets + personalization":

**Research Finding**: Users experience choice paralysis when faced with too many options.

**Solution**: 
- Provide 5-7 strong preset scenes
- Name them clearly (not "Scene A/B/C")
- Include visual + descriptive explanation
- Let users customize each parameter individually after choosing base preset

**For Surrounding**:
- Preset 1: "Deep Focus" (visual: cool, blue lighting; audio: white noise; thermal: 20°C; scent: Rosemary)
- Preset 2: "Stress Recovery" (visual: warm amber; audio: nature sounds; thermal: 22°C; scent: Lavender)
- Preset 3: "Creative Flow" (visual: dynamic colors; audio: instrumental; thermal: 21°C; scent: Citrus)
- Preset 4: "Energy Boost" (visual: bright white; audio: upbeat music; thermal: 19°C; scent: Peppermint)
- Preset 5: "Rest/Sleep" (visual: dim red; audio: ASMR/white noise; thermal: 18°C; scent: none)

### Pattern 2: Research First, Then Architecture

Both projects spent significant research effort BEFORE designing the solution:

**Otto**: 
- Cultural probes → qualitative survey → synthesis of 4 key needs
- Then designed 3-device ecosystem based on needs

**Aura**:
- Therapy literature review + user interviews → identified unawareness + taboo barriers
- Then designed experience that addresses emotional barriers, not just therapy delivery

**For Surrounding**:
You must research BEFORE designing:
- What are actual biometric markers of stress/cognitive load?
- How do people naturally manage transitions between contexts?
- What sensory disruptions cause motion sickness vs. pleasant surprise?
- What privacy concerns exist with biometric tracking?
- How do people want to be told "system inferred you're stressed"?

### Pattern 3: Privacy = Trust Foundation

Both projects made explicit choices around privacy:

**Otto**:
- Device is visible (not hidden) → builds understanding
- Clear information architecture about what data collected
- Easy override mechanisms → sense of control

**Aura**:
- Voice assistant for control (not app-only)
- Emergency switches (physical override)
- Post-session feedback (user has final say)

**For Surrounding** (Critical):
- **Local processing only** (biometrics processed on device, not cloud)
- **Kill switch** (user can disable all tracking instantly)
- **Transparency interface** (users see exactly what system inferred and why)
- **Audit log** (users can review what system did in past 24 hours)
- **Consent granularity** (enable/disable different sensory modalities)

### Pattern 4: Gradual Change, Not Jarring Transition

Both projects emphasized smooth transitions:

**Otto**: "Analyzes environment constantly, makes gradual adjustments"

**Aura**: "Entry/exit corridors specifically designed to ease into/out of experience"

**For Surrounding**:
This is critical for motion sickness prevention:
- When transitioning from "Focused Work" → "Stress Recovery", don't change all 5 modalities simultaneously
- Stagger the changes:
  - Second 0-5: Lighting begins shifting (blue → amber)
  - Second 5-10: Temperature begins adjusting
  - Second 10-15: Audio transitions (white noise → nature sounds)
  - Second 15-20: Scent begins diffusing
- Total transition time: 20-30 seconds (not instantaneous)

### Pattern 5: Intersection of Psychology + Technology

Both projects explicitly grounded design in psychological theory:

**Otto**:
- Hick's Law (reduce cognitive load)
- Parkinson's Law (constraints enable better choices)
- Habit formation (gradual changes create new patterns)

**Aura**:
- Binaural beats (frequency-based mood regulation)
- Associative learning (scents create memories)
- Gregory's top-down theory (expectations shape perception)
- ASMR (sensory calming response)

**For Surrounding**, apply:
- **Circadian rhythm** (adjust color temperature throughout day: more blue morning, more amber evening)
- **Flow theory** (visual + aural design should minimize distractions during focus)
- **Stress recovery** (specific Hz frequencies shown to lower cortisol)
- **Mood congruence** (people perceive environment differently based on current mood)
- **Priming** (scents/colors released just before high-stress meeting)

### Pattern 6: Multisensory Design Hierarchy

Aura showed that all senses don't contribute equally:

**Distribution of Therapeutic Impact**:
- Visual: 40%
- Aural: 30%
- Tactile: 20%
- Olfactory: 5%
- Gustatory: 3%
- Proprioceptive: 2%

**For Surrounding**, suggest similar hierarchy:
- **Visual** (40%) - Lighting design is primary mechanism
- **Aural** (30%) - Sound/frequency design is secondary
- **Thermal** (20%) - Temperature adjustment for comfort
- **Olfactory** (8%) - Scent for priming/memory (less impactful but distinctive)
- **Haptic** (2%) - Vibration/texture feedback (nice-to-have)

This means: **Don't over-invest in olfactory engineering if visual + aural design isn't perfect first.**

---

## RESEARCH METHODOLOGY SYNTHESIS FOR SURROUNDING

Based on Otto & Aura patterns, here's the optimal research approach:

### Phase 1: Problem Space Research (3 weeks)
- [ ] Literature review on: circadian rhythm, stress physiology, flow theory, biometric mood detection accuracy
- [ ] User interviews: 10-12 knowledge workers on stress patterns, cognitive load, environmental preferences
- [ ] Cultural probes: Give users journals to track mood + environment correlation over 1 week
- [ ] Competitive analysis: How do current smart home systems handle similar problems?

### Phase 2: User Immersion (4 weeks)
- [ ] Contextual inquiry: Observe 5-7 users during high-stress and high-focus work periods (full day shadowing)
- [ ] Biometric baseline: Track HR, HRV, skin conductance during different tasks/moods
- [ ] Sensory preference mapping: A/B test different lighting, temperature, sound conditions
- [ ] Failure scenario interviews: "What if system guessed your mood wrong?" role-play exercises

### Phase 3: Synthesis (2 weeks)
- [ ] Affinity mapping: Code all observation data by emotion, behavior, environment
- [ ] Create 4-5 personas based on stress recovery preferences
- [ ] Document success criteria: "What would make you trust this system?"
- [ ] Map sensory hierarchy for your target users (visual vs. aural priority?)

### Phase 4: Design & Validation (4 weeks)
- [ ] Prototype 5 preset scenes based on research insights
- [ ] Test with 3-4 users: "Does this feel invasive? Do you understand why changes happened?"
- [ ] Iterate on: preset naming, customization depth, transparency interface
- [ ] Document override mechanisms: How should emergency/disable work?

---

## Key Takeaways for Surrounding Portfolio Case Study

### What Makes Otto & Aura Google-Level

1. **Deep Research** - Both spent weeks understanding actual user pain (not assumed pain)
2. **Constraint Navigation** - Both identified and designed around hard constraints:
   - Otto: "Users don't understand IoT" → solved with visible, inviting device
   - Aura: "Mental health is taboo" → solved with celebratory experience
   - For Surrounding: "Biometric mood detection is unreliable" → must design graceful failure

3. **Multisensory Architecture** - Both treated all senses as design materials, not afterthoughts
4. **Psychological Grounding** - Every design decision justified by research + theory
5. **Transparency as Foundation** - Users need to understand system logic, not just obey
6. **Iterative Refinement** - Both documented what didn't work and why they pivoted

### For Your Case Study Documentation

When you present Surrounding, make sure to include:

**Acknowledgment of Research Insights**:
"Through interviews with 12 knowledge workers, I discovered that environment-mood correlation exists, but users had never explicitly mapped it. This became the core insight driving design."

**Constraint Documentation**:
"Biometric mood detection has 15% false positive rate. Rather than hiding this, I designed the system to show its reasoning: 'I detected elevated stress via elevated HR. Is this accurate?' Gives users choice."

**Design Philosophy Statement**:
"Following principles from both Otto's ambient automation and Aura's multisensory therapy, I designed Surrounding as: [your unique philosophy here]"

**Acknowledgment of Complexity**:
"The multisensory nature means 10+ parameters changing simultaneously. To prevent sensory overload (lessons from Aura), I implemented graduated transitions over 20-30 seconds, with staggered activation of modalities."

**Privacy Architecture**:
"Given concerns about biometric tracking from Otto research, all mood inference happens locally on-device. User has immediate kill-switch access and can audit system decisions from past 24 hours."

---

## Recommended Next Steps for Surrounding

1. **Read the full Otto/Aura case studies** - Study how they wrote their documentation
2. **Identify your unique angle** - What makes Surrounding different?
   - Otto focuses on: Task transitions
   - Aura focuses on: Therapy/emotional wellness
   - Surrounding focuses on: Proactive stress management across contexts?
3. **Plan your research immersion** - Use Otto/Aura as models for sampling, methods
4. **Document constraints explicitly** - What's the "olfactory latency problem" equivalent for you?
5. **Design your "Experience Framework"** - Create a unifying philosophy (like Aura's "Experience-Therapy Dyad")

**Most important**: Both projects succeeded because they did deep research FIRST, then let insights drive architecture. Don't start with technology—start with humans.

---

## Visual Summary: Otto vs. Aura vs. Surrounding

| Dimension | Otto | Aura | Surrounding |
|-----------|------|------|-------------|
| **Problem** | Task transitions disrupt flow | Therapy inaccessible/stigmatized | Stress management proactive? |
| **Research Approach** | Cultural probes + surveys | Interviews + literature | Contextual inquiry + biometrics |
| **Sensory Modalities** | 3 (Visual, Aural, Thermal) | 6 (All senses) | 4-5 (Visual, Aural, Thermal, Scent, Haptic?) |
| **Scale** | Home environment | Dedicated therapy room | Multiple contexts (Home, Work, Commute) |
| **Interaction Model** | App + tactile device | App + voice assistant + physical room | App + wearable + ambient displays? |
| **Psychology Foundation** | Habit formation, cognitive load | Experiential therapy, associative learning | Stress recovery, circadian rhythm, flow? |
| **Uniqueness** | Transparent, non-invasive automation | Celebratory (not clinical) therapy | Proactive, invisible support? |

