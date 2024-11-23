export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Classes = Database['public']['Tables']['class']['Row'];
export type Asignature = Database['public']['Tables']['asignature']['Row'];
export type Section = Database['public']['Tables']['section']['Row'];
export type List = Database['public']['Tables']['list']['Row'];
export type Asistance = Database['public']['Tables']['asistance']['Row'];
export type Student = Database['public']['Tables']['student']['Row'];
export type Teacher = Database['public']['Tables']['teacher']['Row'];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      asignature: {
        Row: {
          code: string;
          id: string;
          name: string;
        };
        Insert: {
          code: string;
          id?: string;
          name: string;
        };
        Update: {
          code?: string;
          id?: string;
          name?: string;
        };
        Relationships: [];
      };
      asistance: {
        Row: {
          classId: string;
          id: string;
          is_present: boolean;
          studentId: string;
        };
        Insert: {
          classId: string;
          id?: string;
          is_present?: boolean;
          studentId: string;
        };
        Update: {
          classId?: string;
          id?: string;
          is_present?: boolean;
          studentId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'asistance_classId_fkey';
            columns: ['classId'];
            isOneToOne: false;
            referencedRelation: 'class';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'asistance_studentId_fkey';
            columns: ['studentId'];
            isOneToOne: false;
            referencedRelation: 'student';
            referencedColumns: ['id'];
          }
        ];
      };
      class: {
        Row: {
          date: string;
          id: string;
          sectionId: string;
        };
        Insert: {
          date: string;
          id?: string;
          sectionId: string;
        };
        Update: {
          date?: string;
          id?: string;
          sectionId?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'class_sectionId_fkey';
            columns: ['sectionId'];
            isOneToOne: false;
            referencedRelation: 'section';
            referencedColumns: ['id'];
          }
        ];
      };
      list: {
        Row: {
          sectionId: string;
          student: string;
        };
        Insert: {
          sectionId: string;
          student: string;
        };
        Update: {
          sectionId?: string;
          student?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'list_sectionId_fkey';
            columns: ['sectionId'];
            isOneToOne: false;
            referencedRelation: 'section';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'list_student_fkey1';
            columns: ['student'];
            isOneToOne: false;
            referencedRelation: 'student';
            referencedColumns: ['id'];
          }
        ];
      };
      section: {
        Row: {
          asignatureId: string;
          id: string;
          number: number;
          teacher: string;
        };
        Insert: {
          asignatureId: string;
          id?: string;
          number: number;
          teacher: string;
        };
        Update: {
          asignatureId?: string;
          id?: string;
          number?: number;
          teacher?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'section_asignatureId_fkey';
            columns: ['asignatureId'];
            isOneToOne: false;
            referencedRelation: 'asignature';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'section_teacher_fkey';
            columns: ['teacher'];
            isOneToOne: false;
            referencedRelation: 'teacher';
            referencedColumns: ['id'];
          }
        ];
      };
      student: {
        Row: {
          email: string;
          id: string;
          last_name: string;
          name: string;
          rut: string;
        };
        Insert: {
          email: string;
          id: string;
          last_name: string;
          name: string;
          rut: string;
        };
        Update: {
          email?: string;
          id?: string;
          last_name?: string;
          name?: string;
          rut?: string;
        };
        Relationships: [];
      };
      teacher: {
        Row: {
          email: string;
          id: string;
          last_name: string;
          name: string;
          rut: string;
        };
        Insert: {
          email: string;
          id: string;
          last_name: string;
          name: string;
          rut: string;
        };
        Update: {
          email?: string;
          id?: string;
          last_name?: string;
          name?: string;
          rut?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
  ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
  : never;
