import { FC } from 'react';
import { VscGithubAlt } from 'react-icons/vsc';
import { RiLinkedinLine } from 'react-icons/ri';
import { PiInstagramLogo } from 'react-icons/pi';
import { SocialMediaInput } from './SocialMediaInput';

interface SocialMediaLinksProps {
  github: string;
  linkedin: string;
  instagram: string;
  onChange: (field: string, value: string) => void;
  theme: string; 
}

export const SocialMediaLinks: FC<SocialMediaLinksProps> = ({
  github,
  linkedin,
  instagram,
  onChange,
  theme,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    onChange(field, e.target.value);
  };

  return (
    <div className=''>
      <SocialMediaInput
        title="GitHub"
        name="github"
        icon={<VscGithubAlt />}
        placeholder="Enter your GitHub URL"
        value={github}
        onChange={(e: React.ChangeEvent<HTMLInputElement>,) => handleInputChange(e, 'github')}
        theme={theme} 
      />
      <SocialMediaInput
        title="LinkedIn"
        name="linkedin"
        icon={<RiLinkedinLine />}
        placeholder="Enter your LinkedIn URL"
        value={linkedin}
        onChange={(e: React.ChangeEvent<HTMLInputElement>,) => handleInputChange(e, 'linkedin')}
        theme={theme} 
      />
      <SocialMediaInput
        title="Instagram"
        name="instagram"
        icon={<PiInstagramLogo />}
        placeholder="Enter your Instagram URL"
        value={instagram}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, 'instagram')}
        theme={theme} 
      />
    </div>
  );
};
