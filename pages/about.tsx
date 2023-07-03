import ImageTextBox from "@/components/ImageTextBox";

const About = () => {
  return (
    <>
      <ImageTextBox 
        imageUrl={'/images/about-image-1.png'}
        backgroundColor="#4169E1"
        textColor="white"
        header="About Us"
        bodyTextOne="Founded in 2010, we are a creative agency that produces lasting results for our clients. Weve partnered with many startups, corporations, and nonprofits alike to craft designs that make real impact. Were always looking forward to creating brands, products, and digital experiences that connect with our clients audiences."
        bodyTextTwo={null}
        isTextOnLeft={true}
      />
      
      <ImageTextBox 
        imageUrl={'/images/about-image-2.png'}
        backgroundColor="#214CCE"
        textColor="white"
        header="World-class talent"
        bodyTextOne="We are a crew of strategists, problem-solvers, and technologists. Every design is thoughtfully crafted from concept to launch, ensuring success in its given market. We are constantly updating our skills in a myriad of platforms."
        bodyTextTwo="Our team is multi-disciplinary and we are not merely interested in form — content and meaning are just as important. We give great importance to craftsmanship, service, and prompt delivery. Clients have always been impressed with our high-quality outcomes that encapsulates their brands story and mission."
        isTextOnLeft={false}
      />
    </>
  )
}

export default About;
