--
-- PostgreSQL database dump
--

-- Dumped from database version 10.7
-- Dumped by pg_dump version 10.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: dpr; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dpr (
    candidate_no integer NOT NULL,
    name character varying(50) NOT NULL,
    people_id integer
);


ALTER TABLE public.dpr OWNER TO postgres;

--
-- Name: people; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.people (
    no_ktp integer NOT NULL,
    name character varying(50) NOT NULL,
    password character varying(20) NOT NULL,
    email character varying(50) NOT NULL,
    address character varying(50) NOT NULL
);


ALTER TABLE public.people OWNER TO postgres;

--
-- Name: president; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.president (
    candidate_no integer NOT NULL,
    name character varying(50) NOT NULL,
    people_id integer
);


ALTER TABLE public.president OWNER TO postgres;

--
-- Data for Name: dpr; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dpr (candidate_no, name, people_id) FROM stdin;
1	Firman	\N
2	Akmal	\N
\.


--
-- Data for Name: people; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.people (no_ktp, name, password, email, address) FROM stdin;
1	Deri	123	deriandrian16@gmail.com	Tasikmalaya
10001	Fasya	123	ahmad.fasya@gmail.com	Sukabumi
10002	ican	123	ican@gmail.com	Sukabumi
\.


--
-- Data for Name: president; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.president (candidate_no, name, people_id) FROM stdin;
1	Jokowi	\N
2	Prabowo	\N
\.


--
-- Name: dpr dpr_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dpr
    ADD CONSTRAINT dpr_name_key UNIQUE (name);


--
-- Name: dpr dpr_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dpr
    ADD CONSTRAINT dpr_pkey PRIMARY KEY (candidate_no);


--
-- Name: people people_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_email_key UNIQUE (email);


--
-- Name: people people_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_name_key UNIQUE (name);


--
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (no_ktp);


--
-- Name: president president_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.president
    ADD CONSTRAINT president_name_key UNIQUE (name);


--
-- Name: president president_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.president
    ADD CONSTRAINT president_pkey PRIMARY KEY (candidate_no);


--
-- Name: dpr dpr_people_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dpr
    ADD CONSTRAINT dpr_people_id_fkey FOREIGN KEY (people_id) REFERENCES public.people(no_ktp);


--
-- Name: president president_people_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.president
    ADD CONSTRAINT president_people_id_fkey FOREIGN KEY (people_id) REFERENCES public.people(no_ktp);


--
-- PostgreSQL database dump complete
--

