import { useState } from "react";
import { predictFraud } from "../services/api";

const initialState = {
  policy_state: "",
  policy_csl: "",
  insured_sex: "",
  insured_education_level: "",
  insured_occupation: "",
  insured_hobbies: "",
  insured_relationship: "",
  incident_type: "",
  collision_type: "",
  incident_severity: "",
  authorities_contacted: "",
  incident_state: "",
  incident_city: "",
  property_damage: "",
  police_report_available: "",
  fraud_reported: "",
  auto_make: "",
  auto_model: "",
  months_as_customer: "",
  age: "",
  policy_number: "",
  policy_deductable: "",
  policy_annual_premium: "",
  umbrella_limit: "",
  insured_zip: "",
  capital_gains: "",
  capital_loss: "",
  incident_hour_of_the_day: "",
  number_of_vehicles_involved: "",
  bodily_injuries: "",
  witnesses: "",
  total_claim_amount: "",
  injury_claim: "",
  property_claim: "",
  vehicle_claim: "",
  auto_year: "",
  policy_bind_date: "",
  incident_date: ""
};

const ClaimForm = ({ onResult }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const missing = Object.entries(form).filter(([_, v]) => !v);
    if (missing.length) {
      setError("Please select a value for all fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = { ...form };
      const { data } = await predictFraud(payload);
      onResult?.(data);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to get prediction. Please check backend/ML service."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: "1rem",
        padding: "1.5rem",
        borderRadius: "1rem",
        backgroundColor: "rgba(15,23,42,0.9)",
        border: "1px solid rgba(148, 163, 184, 0.4)",
        boxShadow: "0 14px 30px rgba(15,23,42,0.8)"
      }}
    >
      <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "1rem" }}>
        Claim Details
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem"
        }}
      >
        <div>
          <label
            htmlFor="policy_state"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Policy State
          </label>
          <select
            id="policy_state"
            name="policy_state"
            value={form.policy_state}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select state</option>
            <option value="OH">OH</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="policy_csl"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Policy CSL
          </label>
          <select
            id="policy_csl"
            name="policy_csl"
            value={form.policy_csl}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select CSL</option>
            <option value="100/300">100/300</option>
            <option value="250/500">250/500</option>
            <option value="500/1000">500/1000</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="insured_sex"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Insured Sex
          </label>
          <select
            id="insured_sex"
            name="insured_sex"
            value={form.insured_sex}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select sex</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="insured_education_level"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Education Level
          </label>
          <select
            id="insured_education_level"
            name="insured_education_level"
            value={form.insured_education_level}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select level</option>
            <option value="JD">JD</option>
            <option value="High School">High School</option>
            <option value="College">College</option>
            <option value="Masters">Masters</option>
            <option value="Associate">Associate</option>
            <option value="MD">MD</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="insured_occupation"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Occupation
          </label>
          <select
            id="insured_occupation"
            name="insured_occupation"
            value={form.insured_occupation}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select occupation</option>
            <option value="craft-repair">craft-repair</option>
            <option value="machine-op-inspct">machine-op-inspct</option>
            <option value="sales">sales</option>
            <option value="armed-forces">armed-forces</option>
            <option value="tech-support">tech-support</option>
            <option value="prof-specialty">prof-specialty</option>
            <option value="other-service">other-service</option>
            <option value="exec-managerial">exec-managerial</option>
            <option value="protective-serv">protective-serv</option>
            <option value="transport-moving">transport-moving</option>
            <option value="handlers-cleaners">handlers-cleaners</option>
            <option value="adm-clerical">adm-clerical</option>
            <option value="farming-fishing">farming-fishing</option>
            <option value="priv-house-serv">priv-house-serv</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="insured_hobbies"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Hobbies
          </label>
          <select
            id="insured_hobbies"
            name="insured_hobbies"
            value={form.insured_hobbies}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select hobby</option>
            <option value="sleeping">sleeping</option>
            <option value="reading">reading</option>
            <option value="board-games">board-games</option>
            <option value="bungie-jumping">bungie-jumping</option>
            <option value="base-jumping">base-jumping</option>
            <option value="golf">golf</option>
            <option value="camping">camping</option>
            <option value="dancing">dancing</option>
            <option value="skydiving">skydiving</option>
            <option value="movies">movies</option>
            <option value="hiking">hiking</option>
            <option value="yachting">yachting</option>
            <option value="paintball">paintball</option>
            <option value="chess">chess</option>
            <option value="polo">polo</option>
            <option value="basketball">basketball</option>
            <option value="video-games">video-games</option>
            <option value="cross-fit">cross-fit</option>
            <option value="exercise">exercise</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="insured_relationship"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Relationship
          </label>
          <select
            id="insured_relationship"
            name="insured_relationship"
            value={form.insured_relationship}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select relationship</option>
            <option value="husband">husband</option>
            <option value="wife">wife</option>
            <option value="own-child">own-child</option>
            <option value="unmarried">unmarried</option>
            <option value="other-relative">other-relative</option>
            <option value="not-in-family">not-in-family</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="incident_type"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Incident Type
          </label>
          <select
            id="incident_type"
            name="incident_type"
            value={form.incident_type}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select type</option>
            <option value="Single Vehicle Collision">Single Vehicle Collision</option>
            <option value="Vehicle Theft">Vehicle Theft</option>
            <option value="Multi-vehicle Collision">Multi-vehicle Collision</option>
            <option value="Parked Car">Parked Car</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="collision_type"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Collision Type
          </label>
          <select
            id="collision_type"
            name="collision_type"
            value={form.collision_type}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select collision</option>
            <option value="Rear Collision">Rear Collision</option>
            <option value="Side Collision">Side Collision</option>
            <option value="Front Collision">Front Collision</option>
            <option value="?">?</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="incident_severity"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Incident Severity
          </label>
          <select
            id="incident_severity"
            name="incident_severity"
            value={form.incident_severity}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select severity</option>
            <option value="Minor Damage">Minor Damage</option>
            <option value="Major Damage">Major Damage</option>
            <option value="Total Loss">Total Loss</option>
            <option value="Trivial Damage">Trivial Damage</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="authorities_contacted"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Authorities Contacted
          </label>
          <select
            id="authorities_contacted"
            name="authorities_contacted"
            value={form.authorities_contacted}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select authority</option>
            <option value="Police">Police</option>
            <option value="Fire">Fire</option>
            <option value="Ambulance">Ambulance</option>
            <option value="Other">Other</option>
            <option value="None">None</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="incident_state"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Incident State
          </label>
          <select
            id="incident_state"
            name="incident_state"
            value={form.incident_state}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select state</option>
            <option value="OH">OH</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="incident_city"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Incident City
          </label>
          <select
            id="incident_city"
            name="incident_city"
            value={form.incident_city}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select city</option>
            <option value="Columbus">Columbus</option>
            <option value="Arlington">Arlington</option>
            <option value="Springfield">Springfield</option>
            <option value="Riverwood">Riverwood</option>
            <option value="Hillsdale">Hillsdale</option>
            <option value="Northbrook">Northbrook</option>
            <option value="Northbend">Northbend</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="property_damage"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Property Damage
          </label>
          <select
            id="property_damage"
            name="property_damage"
            value={form.property_damage}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="police_report_available"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Police Report Available
          </label>
          <select
            id="police_report_available"
            name="police_report_available"
            value={form.police_report_available}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="fraud_reported"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Fraud Reported
          </label>
          <select
            id="fraud_reported"
            name="fraud_reported"
            value={form.fraud_reported}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="auto_make"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Auto Make
          </label>
          <select
            id="auto_make"
            name="auto_make"
            value={form.auto_make}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select make</option>
            <option value="Saab">Saab</option>
            <option value="Mercedes">Mercedes</option>
            <option value="Dodge">Dodge</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Accura">Accura</option>
            <option value="Nissan">Nissan</option>
            <option value="Audi">Audi</option>
            <option value="Toyota">Toyota</option>
            <option value="Ford">Ford</option>
            <option value="Suburu">Suburu</option>
            <option value="BMW">BMW</option>
            <option value="Jeep">Jeep</option>
            <option value="Honda">Honda</option>
            <option value="Volkswagen">Volkswagen</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="auto_model"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Auto Model
          </label>
          <select
            id="auto_model"
            name="auto_model"
            value={form.auto_model}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          >
            <option value="">Select model</option>
            <option value="92x">92x</option>
            <option value="E400">E400</option>
            <option value="RAM">RAM</option>
            <option value="Tahoe">Tahoe</option>
            <option value="RSX">RSX</option>
            <option value="95">95</option>
            <option value="Pathfinder">Pathfinder</option>
            <option value="A5">A5</option>
            <option value="Camry">Camry</option>
            <option value="F150">F150</option>
            <option value="A3">A3</option>
            <option value="Highlander">Highlander</option>
            <option value="Neon">Neon</option>
            <option value="MDX">MDX</option>
            <option value="Maxima">Maxima</option>
            <option value="Legacy">Legacy</option>
            <option value="TL">TL</option>
            <option value="Impreza">Impreza</option>
            <option value="Forrestor">Forrestor</option>
            <option value="Escape">Escape</option>
            <option value="Corolla">Corolla</option>
            <option value="3 Series">3 Series</option>
            <option value="C300">C300</option>
            <option value="Wrangler">Wrangler</option>
            <option value="M5">M5</option>
            <option value="X5">X5</option>
            <option value="Civic">Civic</option>
            <option value="Passat">Passat</option>
            <option value="Silverado">Silverado</option>
            <option value="CRV">CRV</option>
            <option value="93">93</option>
            <option value="Accord">Accord</option>
            <option value="X6">X6</option>
            <option value="Malibu">Malibu</option>
            <option value="Fusion">Fusion</option>
            <option value="Jetta">Jetta</option>
            <option value="ML350">ML350</option>
            <option value="Ultima">Ultima</option>
            <option value="Grand Cherokee">Grand Cherokee</option>
          </select>
        </div>
      </div>

      <h3
        style={{
          fontSize: "0.95rem",
          fontWeight: 600,
          marginTop: "1.5rem",
          marginBottom: "0.75rem"
        }}
      >
        Additional Numeric & Date Details
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem"
        }}
      >
        <div>
          <label
            htmlFor="months_as_customer"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Months as Customer
          </label>
          <input
            id="months_as_customer"
            name="months_as_customer"
            type="number"
            value={form.months_as_customer}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="age"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="policy_number"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Policy Number
          </label>
          <input
            id="policy_number"
            name="policy_number"
            type="number"
            value={form.policy_number}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="policy_deductable"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Policy Deductible
          </label>
          <input
            id="policy_deductable"
            name="policy_deductable"
            type="number"
            value={form.policy_deductable}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="policy_annual_premium"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Policy Annual Premium
          </label>
          <input
            id="policy_annual_premium"
            name="policy_annual_premium"
            type="number"
            step="any"
            value={form.policy_annual_premium}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="umbrella_limit"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Umbrella Limit
          </label>
          <input
            id="umbrella_limit"
            name="umbrella_limit"
            type="number"
            value={form.umbrella_limit}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="insured_zip"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Insured ZIP
          </label>
          <input
            id="insured_zip"
            name="insured_zip"
            type="number"
            value={form.insured_zip}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="capital_gains"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Capital Gains
          </label>
          <input
            id="capital_gains"
            name="capital_gains"
            type="number"
            value={form.capital_gains}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="capital_loss"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Capital Loss
          </label>
          <input
            id="capital_loss"
            name="capital_loss"
            type="number"
            value={form.capital_loss}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="incident_hour_of_the_day"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Incident Hour (0–23)
          </label>
          <input
            id="incident_hour_of_the_day"
            name="incident_hour_of_the_day"
            type="number"
            min="0"
            max="23"
            value={form.incident_hour_of_the_day}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="number_of_vehicles_involved"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Number of Vehicles Involved
          </label>
          <input
            id="number_of_vehicles_involved"
            name="number_of_vehicles_involved"
            type="number"
            value={form.number_of_vehicles_involved}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="bodily_injuries"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Bodily Injuries
          </label>
          <input
            id="bodily_injuries"
            name="bodily_injuries"
            type="number"
            value={form.bodily_injuries}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="witnesses"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Witnesses
          </label>
          <input
            id="witnesses"
            name="witnesses"
            type="number"
            value={form.witnesses}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="total_claim_amount"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Total Claim Amount
          </label>
          <input
            id="total_claim_amount"
            name="total_claim_amount"
            type="number"
            value={form.total_claim_amount}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="injury_claim"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Injury Claim
          </label>
          <input
            id="injury_claim"
            name="injury_claim"
            type="number"
            value={form.injury_claim}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="property_claim"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Property Claim
          </label>
          <input
            id="property_claim"
            name="property_claim"
            type="number"
            value={form.property_claim}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="vehicle_claim"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Vehicle Claim
          </label>
          <input
            id="vehicle_claim"
            name="vehicle_claim"
            type="number"
            value={form.vehicle_claim}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="auto_year"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Auto Year
          </label>
          <input
            id="auto_year"
            name="auto_year"
            type="number"
            value={form.auto_year}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="policy_bind_date"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Policy Bind Date
          </label>
          <input
            id="policy_bind_date"
            name="policy_bind_date"
            type="date"
            value={form.policy_bind_date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>

        <div>
          <label
            htmlFor="incident_date"
            style={{ display: "block", fontSize: "0.85rem", marginBottom: "0.25rem" }}
          >
            Incident Date
          </label>
          <input
            id="incident_date"
            name="incident_date"
            type="date"
            value={form.incident_date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "0.6rem 0.7rem",
              borderRadius: "0.6rem",
              border: "1px solid rgba(148,163,184,0.6)",
              backgroundColor: "#020617",
              color: "#e5e7eb"
            }}
          />
        </div>
      </div>

      {error && (
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "0.85rem",
            color: "#fca5a5"
          }}
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        style={{
          marginTop: "1.25rem",
          padding: "0.7rem 1.6rem",
          borderRadius: "999px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          background:
            "linear-gradient(135deg, #38bdf8, #4f46e5)",
          color: "#0f172a",
          fontWeight: 600,
          fontSize: "0.95rem",
          boxShadow: "0 12px 25px rgba(56,189,248,0.4)"
        }}
      >
        {loading ? "Predicting..." : "Predict Fraud"}
      </button>
    </form>
  );
};

export default ClaimForm;

