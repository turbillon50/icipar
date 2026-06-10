
CREATE TABLE IF NOT EXISTS churches (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  denomination VARCHAR(100),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100) DEFAULT 'México',
  founded_year INT,
  description TEXT,
  cover_image VARCHAR(500),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  church_id INT REFERENCES churches(id) ON DELETE CASCADE,
  title VARCHAR(300) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  category VARCHAR(80),
  media_urls TEXT[],
  documents TEXT[],
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS testimonies (
  id SERIAL PRIMARY KEY,
  church_id INT REFERENCES churches(id) ON DELETE CASCADE,
  event_id INT REFERENCES events(id) ON DELETE SET NULL,
  author_name VARCHAR(200),
  content TEXT NOT NULL,
  year INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(200) UNIQUE NOT NULL,
  name VARCHAR(200),
  role VARCHAR(50) DEFAULT 'editor',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEED
INSERT INTO churches (name, denomination, city, state, founded_year, description, cover_image)
VALUES
  ('Primera Iglesia Bautista de Guadalajara','Bautista','Guadalajara','Jalisco',1887,'Iglesia pionera del movimiento bautista en el occidente de México, con más de 130 años de historia evangelística y servicio comunitario.','/images/church1.jpg'),
  ('Iglesia Cristiana Evangélica Monterrey','Evangélica','Monterrey','Nuevo León',1921,'Congregación fundada por misioneros norteamericanos, hoy con 5 campus y más de 2,000 familias activas.','/images/church2.jpg'),
  ('Asambleas de Dios Ciudad de México','Pentecostal','Ciudad de México','CDMX',1935,'Una de las primeras iglesias pentecostales en la capital, conocida por sus campañas de avivamiento histórico.','/images/church3.jpg'),
  ('Iglesia Metodista de Oaxaca','Metodista','Oaxaca','Oaxaca',1898,'Fundada en la época porfiriana, preserva archivos históricos únicos del siglo XIX incluyendo diarios y fotografías originales.','/images/church4.jpg'),
  ('Centro Cristiano Nueva Vida Tijuana','Carismática','Tijuana','Baja California',1978,'Iglesia de frontera con fuerte ministerio de alcance social y registro fotográfico de décadas de trabajo comunitario.','/images/church5.jpg')
ON CONFLICT DO NOTHING;

INSERT INTO events (church_id, title, description, event_date, category, tags)
VALUES
  (1,'Fundación Oficial de la Congregación','Ceremonia de fundación con 45 miembros fundadores. El pastor J.C. Brown presidió el primer culto oficial en la calle Prisciliano Sánchez.','1887-03-15','Fundación',ARRAY['historia','fundación','siglo XIX']),
  (1,'Primera Campaña de Avivamiento','Campaña evangelística de 21 días que resultó en 230 conversiones. Predicó el evangelista norteamericano William Thompson.','1902-07-04','Avivamiento',ARRAY['avivamiento','crecimiento','evangelismo']),
  (1,'Construcción del Templo Principal','Inauguración del edificio histórico de cantera que sigue en pie hasta hoy. Participaron más de 400 voluntarios.','1915-12-01','Construcción',ARRAY['templo','construcción','patrimonio']),
  (2,'Llegada de los Primeros Misioneros','El matrimonio Henderson llega a Monterrey con literatura bíblica y materiales de educación cristiana.','1921-09-10','Misiones',ARRAY['misiones','fundación','misioneros']),
  (2,'Primera Conferencia Bíblica Regional','Reunión histórica de 12 iglesias del noreste en el salón principal. Se establecieron relaciones denominacionales duraderas.','1948-04-22','Conferencia',ARRAY['conferencia','unidad','noreste']),
  (3,'Gran Avivamiento de la Capital','Culto al aire libre en el Zócalo con más de 10,000 asistentes. Reportado por varios diarios de la época.','1952-05-20','Avivamiento',ARRAY['avivamiento','capital','historia']),
  (4,'Archivo Fotográfico Digitalizado','Rescate y digitalización de 1,200 fotografías del siglo XIX donadas por familias fundadoras.','2018-11-11','Patrimonio',ARRAY['archivo','fotografías','digitalización']),
  (5,'30 Aniversario de la Congregación','Celebración con más de 3,000 asistentes. Se publicó el libro conmemorativo "30 Años de Fe en la Frontera".','2008-08-15','Aniversario',ARRAY['aniversario','celebración','libro'])
ON CONFLICT DO NOTHING;

INSERT INTO testimonies (church_id, event_id, author_name, content, year)
VALUES
  (1, 1, 'Descendiente de la Familia Ramírez', 'Mi bisabuelo fue uno de los 45 fundadores. Recuerdo los relatos que me contaba mi abuela sobre cómo llegaron a pie desde el rancho para ese primer culto histórico.', 2024),
  (1, 2, 'María Elena Gutiérrez', 'Mi madre me contó que fue en esa campaña donde encontró la fe. Tenemos el programa original guardado en nuestra familia como reliquia.', 2023),
  (3, 3, 'Pastor Roberto Orozco', 'Ser parte de esa generación que vio el avivamiento en la capital fue transformador. Los periódicos cubrieron lo que ocurrió y muchos lo consideran el mayor movimiento espiritual del siglo XX en México.', 2022),
  (4, 7, 'Dr. Carlos Mendoza — Historiador', 'Este archivo es un tesoro nacional. Las fotografías del siglo XIX de comunidades evangélicas en Oaxaca son únicas en América Latina.', 2024)
ON CONFLICT DO NOTHING;

INSERT INTO admin_users (email, name, role) VALUES
  ('admin@icipar.org','Administrador ICIPAR','admin'),
  ('editor@icipar.org','Editor Historia','editor')
ON CONFLICT DO NOTHING;
